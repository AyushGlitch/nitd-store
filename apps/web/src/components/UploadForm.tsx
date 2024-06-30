import React, { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { z } from 'zod';

const UploadForm = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [convertedBlob, setConvertedBlob] = useState(null);
    const [downloadLink, setDownloadLink] = useState('');

    const ImageSchema = z.object({
        size: z
            .number()
            .max(10000000, { message: 'Image size should be less than 5MB' }), // 5MB
        type: z
            .string()
            .refine(
                (val) =>
                    ['image/jpeg', 'image/png', 'image/webp'].includes(val),
                {
                    message: 'Unsupported image type',
                }
            ),
    });

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                ImageSchema.parse({ size: file.size, type: file.type });

                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreview(reader.result);
                };
                reader.readAsDataURL(file);
                console.log('Selected Image:', reader);

                // Convert image to WebP
                const options = {
                    maxSizeMB: 1,
                    maxWidthOrHeight: 1980,
                    useWebWorker: true,
                    fileType: 'image/webp',
                    quality: 0.75,
                };
                const compressedBlob = await imageCompression(file, options);
                setConvertedBlob(compressedBlob);
                console.log('Converted Blob:', compressedBlob);

                // Create download link
                const blobUrl = URL.createObjectURL(compressedBlob);
                setDownloadLink(blobUrl);
                console.log('Download Link:', blobUrl);
            } catch (error) {
                console.error(
                    'Validation error or conversion error:',
                    error.errors || error
                );
                alert(
                    error.errors
                        ? error.errors[0].message
                        : 'Error converting image'
                );
            }
        }
    };

    return (
        <div>
            <h2>Upload an Image</h2>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {preview && (
                <>
                    <h3>Image Preview:</h3>
                    <img
                        src={preview}
                        alt="Image Preview"
                        style={{ maxWidth: '300px' }}
                    />
                </>
            )}
            <br />
            {downloadLink && (
                <a href={downloadLink} download="converted-image.webp">
                    <button>Download Converted Image</button>
                </a>
            )}
        </div>
    );
};

export default UploadForm;

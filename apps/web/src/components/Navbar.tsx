import { useEffect } from 'react';
import { useTheme } from '../store/theme';
import ThemeToggleBtn from './ThemeToggleBtn';
import { Button } from './ui/button';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../lib/utils';

const Links: { name: string; href: string }[] = [
    {
        name: 'Projects',
        href: '/projects',
    },
    {
        name: 'Dashboard',
        href: '/dashboard',
    },
    {
        name: 'About',
        href: '/about',
    },
];

export default function Navbar() {
    const theme = useTheme();
    const location = useLocation();
    const currPath = location.pathname;

    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(theme);
    }, [theme]);

    return (
        <nav className="flex px-7 py-3 justify-between items-center">
            <a href="/">
                <div className="flex gap-4 items-center">
                    <img
                        src="/logo-dark.png"
                        alt="NITD"
                        className="h-16 w-1h-16"
                    />
                    <h1 className="text-2xl font-bold">NITD - Store</h1>
                </div>
            </a>
            <div className="flex gap-3">
                {Links.map((link) => (
                    <Button
                        variant={'ghost'}
                        size={'default'}
                        className={cn(
                            'text-base border-b-4',
                            currPath == link.href
                                ? 'border-slate-700 dark:border-white'
                                : ''
                        )}
                        asChild
                        key={link.name}
                    >
                        <Link to={link.href}>{link.name}</Link>
                    </Button>
                ))}
            </div>
            <div className="flex gap-3 items-center">
                <ThemeToggleBtn />
                <Button variant={'secondary'} size={'sm'} asChild>
                    <Link to="/sign-in">Sign In</Link>
                </Button>
                <Button variant={'default'} size={'sm'} asChild>
                    <Link to="/sign-up">Sign Up</Link>
                </Button>
            </div>
        </nav>
    );
}

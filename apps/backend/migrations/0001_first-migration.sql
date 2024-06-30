-- CreateTable
CREATE TABLE "User" (
    "userId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "verificationOTP" TEXT,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "degree" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "batchPassYear" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "PersonalProjects" (
    "projectId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "projectTitle" TEXT NOT NULL,
    "projectContent" TEXT NOT NULL,
    "imageUrl" TEXT,
    "tag1" TEXT,
    "tag2" TEXT,
    "tag3" TEXT,
    "tag4" TEXT,
    "tag5" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "PersonalProjects_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Likes" (
    "likeId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cntLikes" INTEGER NOT NULL DEFAULT 0,
    "cntDislikes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "projectId" INTEGER NOT NULL,
    CONSTRAINT "Likes_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "PersonalProjects" ("projectId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Comment" (
    "commentId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "commentContent" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "projectId" INTEGER NOT NULL,
    "commentBy" INTEGER NOT NULL,
    CONSTRAINT "Comment_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "PersonalProjects" ("projectId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comment_commentBy_fkey" FOREIGN KEY ("commentBy") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

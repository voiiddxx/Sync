-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('MODIFIED', 'DELETED', 'ADDED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "google_access_token" TEXT DEFAULT '',
    "github_access_token" TEXT DEFAULT '',
    "github_avatar_url" TEXT DEFAULT '',
    "slack_access_token" TEXT DEFAULT '',
    "slack_channel_id" TEXT DEFAULT '',
    "bio" TEXT DEFAULT '',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commit" (
    "id" SERIAL NOT NULL,
    "repo" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "status" TEXT DEFAULT '',
    "commit_message" TEXT DEFAULT '',
    "commit_desc" TEXT DEFAULT '',
    "scheduled_time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isSlack" BOOLEAN NOT NULL DEFAULT false,
    "isForce" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Commit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChangeFile" (
    "id" SERIAL NOT NULL,
    "path" TEXT,
    "content" TEXT,
    "commitId" INTEGER NOT NULL,
    "type" "FileType",

    CONSTRAINT "ChangeFile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Commit" ADD CONSTRAINT "Commit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChangeFile" ADD CONSTRAINT "ChangeFile_commit_modified_fkey" FOREIGN KEY ("commitId") REFERENCES "Commit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChangeFile" ADD CONSTRAINT "ChangeFile_commit_deletion_fkey" FOREIGN KEY ("commitId") REFERENCES "Commit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChangeFile" ADD CONSTRAINT "ChangeFile_commit_addition_fkey" FOREIGN KEY ("commitId") REFERENCES "Commit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChangeFile" ADD CONSTRAINT "ChangeFile_commit_modifiedFileDiff_fkey" FOREIGN KEY ("commitId") REFERENCES "Commit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

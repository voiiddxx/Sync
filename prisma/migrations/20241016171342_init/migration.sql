/*
  Warnings:

  - You are about to drop the column `github_avarat_url` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "github_avarat_url",
ADD COLUMN     "github_avatar_url" TEXT;

-- CreateTable
CREATE TABLE "Commit" (
    "id" SERIAL NOT NULL,
    "repo" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "commit_message" TEXT NOT NULL,
    "commit_desc" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Commit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "changeFiles" (
    "id" SERIAL NOT NULL,
    "path" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "commitId" INTEGER NOT NULL,

    CONSTRAINT "changeFiles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Commit" ADD CONSTRAINT "Commit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "changeFiles" ADD CONSTRAINT "changeFiles_commitId_fkey" FOREIGN KEY ("commitId") REFERENCES "Commit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

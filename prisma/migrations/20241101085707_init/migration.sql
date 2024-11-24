/*
  Warnings:

  - You are about to drop the `ChangeFile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChangeFile" DROP CONSTRAINT "ChangeFile_commit_addition_fkey";

-- DropForeignKey
ALTER TABLE "ChangeFile" DROP CONSTRAINT "ChangeFile_commit_deletion_fkey";

-- DropForeignKey
ALTER TABLE "ChangeFile" DROP CONSTRAINT "ChangeFile_commit_modifiedFileDiff_fkey";

-- DropForeignKey
ALTER TABLE "ChangeFile" DROP CONSTRAINT "ChangeFile_commit_modified_fkey";

-- DropTable
DROP TABLE "ChangeFile";

-- DropEnum
DROP TYPE "FileType";

-- CreateTable
CREATE TABLE "additionFIle" (
    "id" SERIAL NOT NULL,
    "path" TEXT,
    "content" TEXT NOT NULL,
    "commitId" INTEGER NOT NULL,

    CONSTRAINT "additionFIle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deleteFile" (
    "id" SERIAL NOT NULL,
    "path" TEXT,
    "content" TEXT,
    "commitId" INTEGER NOT NULL,

    CONSTRAINT "deleteFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modifiedFile" (
    "id" SERIAL NOT NULL,
    "path" TEXT,
    "content" TEXT,
    "commitId" INTEGER NOT NULL,

    CONSTRAINT "modifiedFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "diffFile" (
    "id" SERIAL NOT NULL,
    "path" TEXT,
    "content" TEXT,
    "commitId" INTEGER NOT NULL,

    CONSTRAINT "diffFile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "additionFIle" ADD CONSTRAINT "additionFIle_commitId_fkey" FOREIGN KEY ("commitId") REFERENCES "Commit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deleteFile" ADD CONSTRAINT "deleteFile_commitId_fkey" FOREIGN KEY ("commitId") REFERENCES "Commit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modifiedFile" ADD CONSTRAINT "modifiedFile_commitId_fkey" FOREIGN KEY ("commitId") REFERENCES "Commit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "diffFile" ADD CONSTRAINT "diffFile_commitId_fkey" FOREIGN KEY ("commitId") REFERENCES "Commit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

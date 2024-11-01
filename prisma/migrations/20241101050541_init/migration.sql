/*
  Warnings:

  - You are about to drop the `changeFiles` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('MODIFIED', 'DELETED', 'ADDED');

-- DropForeignKey
ALTER TABLE "changeFiles" DROP CONSTRAINT "changeFiles_commitId_fkey";

-- DropTable
DROP TABLE "changeFiles";

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
ALTER TABLE "ChangeFile" ADD CONSTRAINT "ChangeFile_commit_modified_fkey" FOREIGN KEY ("commitId") REFERENCES "Commit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChangeFile" ADD CONSTRAINT "ChangeFile_commit_deletion_fkey" FOREIGN KEY ("commitId") REFERENCES "Commit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChangeFile" ADD CONSTRAINT "ChangeFile_commit_addition_fkey" FOREIGN KEY ("commitId") REFERENCES "Commit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

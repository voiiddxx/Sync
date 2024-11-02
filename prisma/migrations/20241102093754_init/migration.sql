/*
  Warnings:

  - A unique constraint covering the columns `[commitId,path]` on the table `additionFIle` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[commitId,path]` on the table `deleteFile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[commitId,path]` on the table `diffFile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[commitId,path]` on the table `modifiedFile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "additionFIle_commitId_path_key" ON "additionFIle"("commitId", "path");

-- CreateIndex
CREATE UNIQUE INDEX "deleteFile_commitId_path_key" ON "deleteFile"("commitId", "path");

-- CreateIndex
CREATE UNIQUE INDEX "diffFile_commitId_path_key" ON "diffFile"("commitId", "path");

-- CreateIndex
CREATE UNIQUE INDEX "modifiedFile_commitId_path_key" ON "modifiedFile"("commitId", "path");

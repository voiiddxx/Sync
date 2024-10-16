/*
  Warnings:

  - You are about to drop the column `github_avarat` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "github_avarat",
ADD COLUMN     "github_avarat_url" TEXT;

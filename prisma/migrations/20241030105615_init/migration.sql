-- DropForeignKey
ALTER TABLE "changeFiles" DROP CONSTRAINT "changeFiles_commitId_fkey";

-- AddForeignKey
ALTER TABLE "changeFiles" ADD CONSTRAINT "changeFiles_commitId_fkey" FOREIGN KEY ("commitId") REFERENCES "Commit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

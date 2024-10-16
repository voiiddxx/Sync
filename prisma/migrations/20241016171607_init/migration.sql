-- AlterTable
ALTER TABLE "Commit" ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "commit_message" DROP NOT NULL,
ALTER COLUMN "commit_desc" DROP NOT NULL;

-- AlterTable
ALTER TABLE "changeFiles" ALTER COLUMN "path" DROP NOT NULL,
ALTER COLUMN "content" DROP NOT NULL;

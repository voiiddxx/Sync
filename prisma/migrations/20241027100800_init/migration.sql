-- AlterTable
ALTER TABLE "Commit" ALTER COLUMN "status" SET DEFAULT '',
ALTER COLUMN "commit_message" SET DEFAULT '',
ALTER COLUMN "commit_desc" SET DEFAULT '';

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "google_access_token" SET DEFAULT '',
ALTER COLUMN "github_access_token" SET DEFAULT '',
ALTER COLUMN "bio" SET DEFAULT '',
ALTER COLUMN "github_avatar_url" SET DEFAULT '',
ALTER COLUMN "slack_access_token" SET DEFAULT '',
ALTER COLUMN "slack_channel_id" SET DEFAULT '';

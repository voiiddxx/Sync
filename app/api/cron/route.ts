// /app/api/runCron/route.ts
import cron from 'node-cron';
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { pushCommitModule, pushMessageToSlack } from '@/modules/repoModule';
import moment from 'moment-timezone';

const prisma = new PrismaClient();

// Run the cron job every minute
cron.schedule('* * * * *', async () => {
  console.log("Cron is running");

  try {
    // Fetch all commits scheduled for the current minute
    const pendingCommits = await getAllPendingCommit();

    if (pendingCommits.length > 0) {
      for (const commit of pendingCommits) {
        console.log(`Processing commit for user: ${commit.user.username}`);

        // Try pushing the commit
        const res = await pushCommitModule(
          commit.user.username,
          commit.repo,
          commit.files,
          commit.branch,
          commit.user.github_access_token!,
          commit.isForce
        );

        if (res) {
          console.log(`Commit pushed successfully for user: ${commit.user.username}`);

          // If Slack notification is enabled, push a message to Slack
          if (commit.isSlack && commit.user.slack_channel_id && commit.user.slack_access_token) {
            await pushMessageToSlack(commit.user.slack_channel_id, "Commit Created", commit.user.slack_access_token);
            console.log(`Slack message sent for user: ${commit.user.username}`);
          }
        } else {
          console.error(`Failed to push commit for user: ${commit.user.username}`);
        }
      }
    } else {
      console.log("No pending commits for this minute.");
    }
  } catch (error) {
    console.error("Error running cron job:", error);
  }
});

export async function GET() {
  return NextResponse.json({ message: 'Cron job started' });
}

// Fetches all pending commits scheduled for the current minute
 const getAllPendingCommit = async () => {
  // Get current time in IST
  const currentTimeIST = moment.tz('Asia/Kolkata');

  // Set seconds and milliseconds to zero to focus on the current minute
  const currentMinuteIST = currentTimeIST.clone().set({ seconds: 0, milliseconds: 0 });
  
  // Convert to UTC for database query
  const currentMinuteUTC = currentMinuteIST.clone().tz('UTC');

  // Create a range for the current minute
  const startOfMinuteUTC = currentMinuteUTC.toISOString();
  const endOfMinuteUTC = currentMinuteUTC.clone().add(1, 'minute').toISOString(); // Add 1 minute

  // Fetch commits scheduled within the current minute
  const commits = await prisma.commit.findMany({
    where: {
      status: 'Scheduled',
      scheduled_time: {
        gte: startOfMinuteUTC, // Greater than or equal to the start of the minute
        lt: endOfMinuteUTC // Less than the start of the next minute
      }
    },
    include: {
      files: true,
      user: true
    }
  });

  console.log("Total pending commits:", commits.length, startOfMinuteUTC, endOfMinuteUTC);
  return commits;
};

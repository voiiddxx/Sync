// /app/api/runCron/route.ts
import cron from 'node-cron';
import { NextResponse } from 'next/server';

// Run the cron job every minute
cron.schedule('* * * * *', async () => {
  console.log("Cron is running");
});

export async function GET() {
  return NextResponse.json({ message: 'Cron job started' });
}

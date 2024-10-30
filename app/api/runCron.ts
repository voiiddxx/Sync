import cron from 'node-cron';
import { exec } from 'child_process';

// Run the cron job every minute
cron.schedule('* * * * *', async () => {

    console.log("Cron is running");
    
});

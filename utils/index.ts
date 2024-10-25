import { WebClient } from "@slack/web-api";


export const pushMessageToSlack =async (channelId : string , message: string , accessTokn: string)=>{
    try {
        const slack = new WebClient(process.env.SLACK_BOT_TOKEN);
        
        const result = await slack.chat.postMessage({
            channel: channelId,
            text: message,
            username: 'Floww',
        });

        if(!result.ok){
            return false;
        }

        console.log(result);
        console.log("Message Pushed to slack");
        
        
        return true;
    } catch (error) {
        console.log(error);
        throw new Error('Some Error occured while sending message to slack');
        
    }
}
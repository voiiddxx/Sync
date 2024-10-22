import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const username = req.nextUrl.searchParams.get('username');

        if (!username) {
            return NextResponse.json({ status: 400, message: 'No username found' });
        }

        const user = await prisma.user.findFirst({
            where: {
                username: username
            }
        });

        if (!user) {
            return NextResponse.json({ status: 404, message: 'User not found' });
        }

        const activityRes = await axios.get(`https://api.github.com/users/${username}/events`, {
            headers: {
                Authorization: `Bearer ${user.github_access_token}`
            }
        });

        if (activityRes.status !== 200) {
            return NextResponse.json({ status: activityRes.status, message: activityRes.data.message });
        }

        
        const activities = activityRes.data.filter((event: any) =>
            ['PushEvent', 'PullRequestEvent', 'IssuesEvent' , 'MemberEvent' , 'CreateEvent'].includes(event.type)
        );

        if (!activities) {
            return NextResponse.json({ status: 404, message: 'No relevant activities found' });
        }

        return NextResponse.json({ status: 200, data: activities });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: 500, message: 'INternal Server Error!' });

    }
}
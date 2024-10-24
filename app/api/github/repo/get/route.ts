import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function POST(req: NextRequest) {


    try {

        const { username, repo } = await req.json();

        console.log(username, repo);

        if (!username && !repo) {
            return NextResponse.json({ status: 400, message: 'Please provide both username and repo' });
        }

        const user = await prisma.user.findFirst({
            where: { username: username! }
        });

        if (!user) {
            return NextResponse.json({ status: 404, message: 'User not found' });
        }

        // getting specific repo data 
        const repoData = await axios.get(`https://api.github.com/repos/${username}/${repo}`, {
            headers: {
                'Authorization': `token ${user.github_access_token}`
            }
        });

        console.log(repoData);


        const allBranchForRepo = await axios.get(`https://api.github.com/repos/${username}/${repo}/branches`, {
            headers: {
                'Authorization': `token ${user.github_access_token}`
            }
        });


        const commits = await prisma.commit.findMany({
            where: {
                repo: repo,
                status:'Requested',
                user: {
                    username: username
                },
            },
            include:{
                files:true
            }
        });

        const scheduledCommit = await prisma.commit.findMany({
            where: {
                status: 'Scheduled',
                repo:repo,
                user: {
                    username: username
                },
            },
            include:{
                files:true
            }
        });



        const repoJSON = repoData.data;
        repoJSON.branches = allBranchForRepo.data;
        repoJSON.reqCommit = commits;
        repoJSON.scheduledCommit = scheduledCommit;

        return NextResponse.json({
            repo: repoJSON,
            status: 200
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: 500, message: 'Some issue occured' });

    }
}
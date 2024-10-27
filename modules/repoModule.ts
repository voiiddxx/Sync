import { PrismaClient } from "@prisma/client"
import axios from "axios";



const prisma = new PrismaClient();

export const getUserRepos = async (user : any , repo : string)=>{
    try {
        const repoData = await axios.get(`https://api.github.com/repos/${user.username}/${repo}`, {
            headers: {
                'Authorization': `token ${user.github_access_token}`
            }
        });

        const allBranchForRepo = await axios.get(`https://api.github.com/repos/${user.username}/${repo}/branches`, {
            headers: {
                'Authorization': `token ${user.github_access_token}`
            }
        });

        const commits = await prisma.commit.findMany({
            where: {
                repo: repo,
                status:'Requested',
                user: {
                    username: user.username
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
                    username: user.username
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

        return repoJSON;
    } catch (error) {
        console.log(error);
        
    }
}
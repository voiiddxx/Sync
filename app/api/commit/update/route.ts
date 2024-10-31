


// api for updating the commit data

import { getUserRepos } from "@/modules/repoModule";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { username, commitId, data } = body;

        const existingUser = await prisma.user.findFirst({
            where: {
                username: username
            }
        });

        if (!existingUser) {
            return NextResponse.json({ status: 404, message: 'User Not found' })
        }

        const existingCommit = await prisma.commit.findFirst({
            where: {
                id: commitId,
                user: {
                    id: existingUser.id
                }
            },
        });

        if (!existingCommit) {
            return NextResponse.json({
                status: 404, message: 'commit not found'
            });
        }

        // updating the commit data

        const updateCommit = await prisma.commit.update({
            where:{
                id:commitId
            },
            data:data,
        });

        if(!updateCommit){
            return NextResponse.json({ status: 500, message: 'Failed to update commit data' });
        }

        // getting repo data

        const userUpdatedRepoData = await getUserRepos(existingUser , updateCommit.repo);

        if(!userUpdatedRepoData){
            return NextResponse.json({status:404 , message:'Some error occured'});
        }

        return NextResponse.json({ status: 200, message: 'Commit data updated successfully', data: userUpdatedRepoData });
        
    } catch (error) {
        console.log('Error' + error);
        return NextResponse.json({ status: 500, message: 'Some error occured' });

    }
}
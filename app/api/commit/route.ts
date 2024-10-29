import { getUserRepos } from "@/modules/repoModule";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function PUT (req : NextRequest){
    const body = await req.json();
    const {commitId , data} = body;

    try {
        const existingCommit = await prisma.commit.findFirst({
            where:{
                id:commitId
            },
            include:{
                user:true
            }
        });

        if(!existingCommit){
            return NextResponse.json({status:404 , message: 'Commit not found'})
        }

        // updating commit data

        const updatedCommit = await prisma.commit.update({
            where:{
                id:commitId
            },
            data:{
                ...data,
            }
        });

       
        if(!updatedCommit){
            return NextResponse.json({status:500 , message: 'Failed to update commit'})
        }
        
        const usersRepo = await getUserRepos(existingCommit.user , existingCommit.repo);

        return NextResponse.json({status:200 , data:usersRepo , message: 'Commit updated successfully'})

    } catch (error) {
        console.log("Some error occured" , error);
        return NextResponse.json({status:500 , message: 'Something went wrong'})
        
    }
    
}
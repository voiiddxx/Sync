import { getUserRepos } from "@/modules/repoModule";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function POST (req : NextRequest){
    try {
        const body = await req.json();

        const {username , commitId , userId} = body;

        if(!username && !commitId && !userId){
            return NextResponse.json({status:400 , error:'All fields are required'});
        }

        const existinUser = await prisma.user.findFirst({
            where:{
                username:username,
                id:userId
            }
        });
        if(!existinUser){
            return NextResponse.json({status:404 , error:'User not found'});
        }

        const commit = await prisma.commit.findFirst({
            where:{
                id:commitId,
                user:{
                    id:userId
                }
            }
        });

        if(!commit){
            return NextResponse.json({status:404 , error:'Commit not found'});
        }

        const updatedCommit = await prisma.commit.delete({
            where:{
                id:commitId
            }
        });

        if(!updatedCommit){
            return NextResponse.json({status:404 , error:'Error while deleting commit'});
        }

        const updatedUserRepo = await getUserRepos(existinUser , commit.repo);

        if(!updatedUserRepo){
            return NextResponse.json({status:500 , error:'Error while updating user repos'});
        }

        return NextResponse.json({status:200 , data:updatedUserRepo, message:'Commit deleted successfully'});
        

    } catch (error) {

        console.log(error);
        
        return NextResponse.json({status:500 , error:'Some error occured'});
    }
}
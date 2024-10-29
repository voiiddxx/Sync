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
        
        return NextResponse.json({status:200 , message: 'Commit updated successfully'})

    } catch (error) {
        console.log("Some error occured" , error);
        return NextResponse.json({status:500 , message: 'Something went wrong'})
        
    }
    
}
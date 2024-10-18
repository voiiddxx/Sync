import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function GET(req:NextRequest){
    
    const username = req.nextUrl.searchParams.get('username');

    if(!username){
        return NextResponse.json({status:400 , message:'No Username found'})
    }

    try {
        const existingUser = await prisma.user.findFirst({
            where:{username: username} ,include:{
                commits:true
            },
        });

        if(!existingUser){
            return NextResponse.json({status:404 , message:'User Not Found'})
        }
        return NextResponse.json({status:200 , data:existingUser});
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({status:500 , message:'Internal Server Error'})
    }
    
}
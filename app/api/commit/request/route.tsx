import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { log } from "node:console";

const prisma = new PrismaClient();


export async function POST(req : NextRequest){
    const body =  await req.json();

    const {username , repo , branch , files} = body;


    const existingUser = await prisma.user.findFirst({
        where:{username:username}
    });

    if(!existingUser){
        throw new Error("User not found");
    }

    try{
        
    const commitRes = await prisma.commit.create({
        data:{
            branch:branch,
            repo:repo,
            user:{
                connect:{
                    id:existingUser.id
                }
            },
            files: {
                create: files.map((file: { path: string; content: string }) => ({
                  path: file.path,
                  content: file.content,
                })),
              },
        },
    });
    return NextResponse.json({commitRes});
    } catch(err){
        console.log(err);
    }

    return NextResponse.json({status:500, message:"Failed to sync commit"});

}


export async function GET(req: NextRequest){
     try {
        const username = req.nextUrl.searchParams.get('username')!;

        const user = await prisma.user.findFirst({
            where:{username:username}
        });
        if(!user){
            throw new Error("User not found");
        }

        const commit = await prisma.commit.findMany({
            where:{
                user:{
                    id:user.id
                }
            },
            include:{
                files:true,
            }
        });

        if(!commit){
            throw new Error("No commit found");
        }

        return NextResponse.json({user:user , commit:commit });

     } catch (error) {
        console.log(error);
        return NextResponse.json({status:500, message:"Failed to fetch requests"});
        
     }
}
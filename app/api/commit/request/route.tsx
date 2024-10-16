import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();


export async function POST(req : NextRequest){
    const body =  await req.json();

    const {username , repo , branch , files} = body;


    let existingUser = await prisma.user.findFirst({
        where:{username:username}
    });

    if(!existingUser){
        throw new Error("User not found");
    }

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


    
    
}
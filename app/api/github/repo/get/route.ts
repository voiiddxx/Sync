import { getUserRepos } from "@/modules/repoModule";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function POST(req: NextRequest) {

    try {

        const { username, repo } = await req.json();

        if (!username && !repo) {
            return NextResponse.json({ status: 400, message: 'Please provide both username and repo' });
        }

        const user = await prisma.user.findFirst({
            where: { username: username! }
        });

        if (!user) {
            return NextResponse.json({ status: 404, message: 'User not found' });
        }

        const data = await getUserRepos(user, repo);

        return NextResponse.json({
            repo: data,
            status: 200
        });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: 500, message: 'Some issue occured' });

    }
}



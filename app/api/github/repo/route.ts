import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    try {
        const username = req.nextUrl.searchParams.get('username');
        if (!username) {
            return NextResponse.json({ status: 400, message: 'Username is required!' });
        }

        const user = await prisma.user.findFirst({
            where: {
                username: username
            }
        });
        if (!user) {
            return NextResponse.json({ status: 404, message: 'User not found!' });
        }

        // getting the user repo

        const repoResponse = await axios.get(`https://api.github.com/users/${username}/repos`, {
            headers: {
                'Authorization': `token ${user.github_access_token}`
            }
        });


        if (repoResponse.status !== 200) {
            return NextResponse.json({ status: repoResponse.status, message: 'Some error found while fetching repositories' });
        }

        const allRepos = repoResponse.data;

        console.log(allRepos);


        const formattedRepoData = allRepos.map((repo: any) => ({
            name: repo.name,
            fullname: repo.full_name,
            private: repo.private,
            stars: repo.stargazers_count,
            language: repo.language,
            forks: repo.forks_count,
            created_at: repo.created_at,
        }));

        const sortedRepoData = formattedRepoData.sort((a: any, b: any) => {
            return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        });

        return NextResponse.json({ status: 200, data: sortedRepoData });


    } catch (error) {
        console.log(error);
        return NextResponse.json({ status: 500, message: 'Some Internal Server Error!' });

    }
}
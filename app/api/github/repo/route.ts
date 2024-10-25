import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// Helper function to fetch all repositories using pagination
async function fetchAllRepos(token: string) {
  let allRepos: any[] = [];
  let page = 1;
  let hasMore = true;

  try {
    while (hasMore) {
      const response = await axios.get(
        `https://api.github.com/user/repos?per_page=100&page=${page}`,
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(`Error fetching repos: ${response.statusText}`);
      }

      const repos = response.data;
      if (repos.length === 0) {
        hasMore = false; // No more repos to fetch
      } else {
        allRepos = allRepos.concat(repos);
        page++;
      }
    }
  } catch (error) {
    console.error("Error fetching repositories:", error);
    throw error;
  }

  return allRepos;
}

// API route handler to fetch and return formatted repositories
export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const username = url.searchParams.get("username");
    if (!username) {
      return NextResponse.json({
        status: 400,
        message: "Username is required!",
      });
    }

    // Fetch user from the database
    const user = await prisma.user.findFirst({
      where: { username },
    });

    if (!user) {
      return NextResponse.json({
        status: 404,
        message: "User not found!",
      });
    }

    const token = user.github_access_token;

    // Fetch all public and private repositories using the token
    const allRepos = await fetchAllRepos(token!);

    // Format and sort repositories by creation date (newest first)
    const formattedRepoData = allRepos.map((repo: any) => ({
      name: repo.name,
      fullname: repo.full_name,
      private: repo.private,
      stars: repo.stargazers_count,
      language: repo.language,
      forks: repo.forks_count,
      created_at: repo.created_at,
    }));

    const sortedRepoData = formattedRepoData.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return NextResponse.json({ status: 200, data: sortedRepoData });
  } catch (error) {
    console.error("Error in API:", error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error",
    });
  }
}

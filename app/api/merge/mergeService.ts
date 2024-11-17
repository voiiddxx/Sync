import { PrismaClient } from "@prisma/client";
import axios from "axios";

const prisma = new PrismaClient();

export async function getPullRequestService(body: any) {
    try {
        const { username, repo } = body
        if (!username) {
            throw new Error('Username not provided');
        }

        const isUser = await prisma.user.findFirst({
            where: {
                username: username
            }
        });

        if (!isUser) {
            throw new Error('User not found');
        }

        const response = await axios.get(`https://api.github.com/repos/${username}/${repo}/pulls`, {
            headers: {
                'Authorization': `token ${isUser.github_access_token}`
            }
        });
        if (response.status !== 200) {
            throw new Error('Failed to fetch pull requests');
        }

        return response.data;

    } catch (error) {
        console.log(error);
        throw new Error('Error fetching pull request service');
    }
}
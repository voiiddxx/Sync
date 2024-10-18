import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";



const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const { username, commitId } = await req.json();


        if (!username && !commitId) {
            return NextResponse.json({ status: 400, message: 'No username or commitId provided' })
        }

        const user = await prisma.user.findFirst({
            where: { username: username }
        });

        if (!user) {
            return NextResponse.json({ status: 400, message: 'No User found' })
        }

        const commit = await prisma.commit.findFirst({
            where: { id: commitId }, include: {
                files: true
            }
        });

        if (!commit) {
            return NextResponse.json({ status: 400, message: 'No Commit Found' })
        }

        const push = await postCommit(username, commit.repo, commit.files, 'main', user.github_access_token!);

        if (!push) {
            return NextResponse.json({ status: 400, message: 'Failed To commit , try again later!' });
        }

        return NextResponse.json({ status: 200, message: 'Commit pushed successfully!' })

    } catch (error) {
        console.log('Some error occured');
        return NextResponse.json({ status: 500, message: 'Some issue occured , try again later' })

    }

}


// creating all the function for posting the commit

const postCommit = async (username: string, repo: string, files: any, branch: string, accessToken: string) => {
    try {
        const newPushedTreeSha = await createTree(username, branch, repo, accessToken, files);

        // creating new commit
        const commitResponse = await axios.post(`https://api.github.com/repos/${username}/${repo}/git/commits`, {
            message: 'Commit Created from Flow',
            tree: newPushedTreeSha,
            parents: [await getLatestShaforCommit(accessToken, repo, username, branch)]
        },
            {
                headers: {
                    Authorization: `token ${accessToken}`,
                    'Content-Type': 'application/json',
                }
            }
        );
        const isCommited = await updateBranchRef(repo, branch, username, accessToken, commitResponse.data.sha)

        if (!isCommited) {
            throw new Error('Failed to update branch refrence');
        }
        return true;
    } catch (error) {
        console.log("Some error occured", error);
        throw new Error('Issue found');
    }
}



// func for updating the branch refrence


const updateBranchRef = async (repo: string, branch: string, username: string, accessToken: string, newCommitSHA: string) => {
    const res = await axios.patch(`https://api.github.com/repos/${username}/${repo}/git/refs/heads/${branch}`, {
        sha: newCommitSHA,
        force: false
    }, {
        headers: {
            Authorization: `token ${accessToken}`,
            'Content-Type': 'application/json',
        }
    }
    );

    if (res.status === 200) {
        return true;
    }
    return false;

}


// func for getting the SHA for the latest commit 
const getLatestShaforCommit = async (accessToken: string, repo: string, username: string, branch: string) => {
    try {
        const response = await axios.get(`https://api.github.com/repos/${username}/${repo}/git/refs/heads/${branch}`, {
            headers: {
                Authorization: `token ${accessToken}`,
            }
        });
        return response.data.object.sha;
    } catch (error) {
        throw new Error('Error occured while fetching the latest commit sha');
    }
}


// func for getting the commit response using the commit SHA

const getCommitResBasedOnSHA = async (latestCommitSHa: string, accessToken: string, username: string, repo: string) => {
    try {
        const response = await axios.get(`https://api.github.com/repos/${username}/${repo}/git/commits/${latestCommitSHa}`, {
            headers: {
                Authorization: `token ${accessToken}`,
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Error occured while fetching the commit response');
    }

}


const getLatestTreeDatabasedonLatestTreeSHA = async (accessToken: string, latestTreeSHA: string, username: string, repo: string) => {
    try {

        const response = await axios.get(`https://api.github.com/repos/${username}/${repo}/git/trees/${latestTreeSHA}`, {
            headers: {
                Authorization: `token ${accessToken}`,
            }
        });
        return response.data;

    } catch (error) {
        throw new Error('Error occured while fetching the latest Tree');
    }
}

// func for creating new tree
const createTree = async (username: string, branch: string, repo: string, accessToken: string, changeFiles: any) => {
    try {
        const latestCommitSHA = await getLatestShaforCommit(accessToken, repo, username, branch);

        console.log("Latest commit SHA: " + latestCommitSHA);


        const latestCommitData = await getCommitResBasedOnSHA(latestCommitSHA, accessToken, username, repo);


        const latestTreeSha = latestCommitData.tree.sha;




        console.log("latest tree sha: " + latestTreeSha);


        const latestTreeData = await getLatestTreeDatabasedonLatestTreeSHA(accessToken, latestTreeSha, username, repo);


        console.log("latest tree data: " + latestTreeData);

        const existingFile = latestTreeData.tree;

       


        const newTreeData = existingFile.map((file: any) => {
            return {
                path: file.path,
                mode: file.mode,
                sha: file.sha
            }
        })


        for (const file of changeFiles) {
            const filePath = file.path
            const fileContent = file.content

            // uploading files on blobs

            const res = await axios.post(`https://api.github.com/repos/${username}/${repo}/git/blobs`, {
                content: fileContent,
                encoding: 'utf-8'
            }, {
                headers: {
                    Authorization: `token ${accessToken}`,
                    'Content-Type': 'application/json',
                }
            }
            );

            console.log("file added in blobs ", res.data);


            if (!res) {
                throw new Error('Error occured while uploading file')
            }

            newTreeData.push({
                path: filePath,
                mode: '100644',
                sha: res.data.sha,
            });
        }

        // uploading tree
        try {
            const treeResponse = await axios.post(`https://api.github.com/repos/${username}/${repo}/git/trees`, {
                tree: newTreeData,
                base_tree: latestTreeSha
            }, {
                headers: {
                    Authorization: `token ${accessToken}`,
                    'Content-Type': 'application/json',
                }
            });

            return treeResponse.data.sha;
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        throw new Error('Error occured while creating Tree')
    }
}




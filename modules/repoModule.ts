import { PrismaClient } from "@prisma/client"
import axios from "axios";



const prisma = new PrismaClient();

export const getUserRepos = async (user: any, repo: string) => {
    try {
        const repoData = await axios.get(`https://api.github.com/repos/${user.username}/${repo}`, {
            headers: {
                'Authorization': `token ${user.github_access_token}`
            }
        });

        const allBranchForRepo = await axios.get(`https://api.github.com/repos/${user.username}/${repo}/branches`, {
            headers: {
                'Authorization': `token ${user.github_access_token}`
            }
        });

        const commits = await prisma.commit.findMany({
            where: {
                repo: repo,
                status: 'Requested',
                user: {
                    username: user.username
                },
            },
            include: {
                additionFile:true,
                deleteFile:true,
                modifiedFile:true,
                diffFile:true,
                user:true
            }
        });

        const scheduledCommit = await prisma.commit.findMany({
            where: {
                status: 'Scheduled',
                repo: repo,
                user: {
                    username: user.username
                },
            },
            include: {
                // files: true
            }
        });


        const repoJSON = repoData.data;
        repoJSON.branches = allBranchForRepo.data;
        repoJSON.reqCommit = commits;
        repoJSON.scheduledCommit = scheduledCommit;

        return repoJSON;
    } catch (error) {
        console.log(error);

    }
}







export const pushCommitModule = async (username: string, repo: string, files: any, branch: string, accessToken: string, forced: boolean) => {
    try {

        const newPushedTreeSha = await createTree(username, branch, repo, accessToken, files);

        // creating new commit
        const commitResponse = await axios.post(`https://api.github.com/repos/${username}/${repo}/git/commits`, {
            message: 'Commit Created from Flow',
            tree: newPushedTreeSha,
            parents: [await getLatestShaforCommit(accessToken, repo, username, branch)],
            force: forced
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



// func for creating new tree
const createTree = async (username: string, branch: string, repo: string, accessToken: string, changeFiles: any) => {
    try {
        const latestCommitSHA = await getLatestShaforCommit(accessToken, repo, username, branch);



        const latestCommitData = await getCommitResBasedOnSHA(latestCommitSHA, accessToken, username, repo);


        const latestTreeSha = latestCommitData.tree.sha;



        const latestTreeData = await getLatestTreeDatabasedonLatestTreeSHA(accessToken, latestTreeSha, username, repo);



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



import { WebClient } from "@slack/web-api";


export const pushMessageToSlack =async (channelId : string , message: string , accessTokn: string)=>{
    try {
        const slack = new WebClient(process.env.SLACK_BOT_TOKEN);
        
        const result = await slack.chat.postMessage({
            channel: channelId,
            text: message,
            username: 'Floww',
        });

        if(!result.ok){
            return false;
        }

        console.log(result);
        console.log("Message Pushed to slack");
        
        
        return true;
    } catch (error) {
        console.log(error);
        throw new Error('Some Error occured while sending message to slack');
        
    }
}
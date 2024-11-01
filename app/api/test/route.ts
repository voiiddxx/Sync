import { NextRequest, NextResponse } from "next/server";
import simpleGit from 'simple-git';
import path from 'path';

export async function POST(req: NextRequest) {

    console.log("Api called");
    
    // Use path.join for cross-platform compatibility
    const repoPath = path.join('E:', 'dummy', 'Echo');
    const git = simpleGit(repoPath); // Specify your local repo path

    try {
        
        console.log("Branch getting");
        const gitBranch = await git.branch(); // Await the promise
        const currentBranch = gitBranch.current;

        
        console.log(currentBranch);

        console.log("Yha nahi pohocha");
        
        return NextResponse.json({ message: "Done", branch: currentBranch }); // Return JSON response

    } catch (error) {
        console.error("Error fetching branch:", error);
        return NextResponse.json({ error: "Failed to get current branch." }, { status: 500 });
    }
}

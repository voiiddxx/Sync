import { getUserRepos } from "@/modules/repoModule";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    username,
    repo,
    branch,
    createdFile,
    deleteFile,
    modifiedFile,
    diffFile,
  } = body;

  const existingUser = await prisma.user.findFirst({
    where: { username: username },
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  let created = [];
  let modified = [];
  let deleted = [];
  let diffData = [];

  if (createdFile.length > 0) {
    created = createdFile.map((curr: any) => {
      return { path: curr.path, content: curr?.content };
    });
  }

  if (modifiedFile.length > 0) {
    modified = modifiedFile.map((curr: any) => {
      return { path: curr.path, content: curr?.content };
    });
  }

  if (deleteFile.length > 0) {
    deleted = deleteFile.map((curr: any) => {
      return { path: curr.path };
    });
  }

  if (diffFile.length > 0) {
    diffData = diffFile.map((curr: any) => {
      return { path: curr.path, content: curr.content };
    });
  }

  const isCommitExist = await prisma.commit.findFirst({
    where: {
      branch: branch,
      repo: repo,
      status: "Requested",
      user: {
        username: existingUser.username,
      },
    },
  });

  if (isCommitExist) {
    await prisma.additionFIle.deleteMany({
      where: {
        commitId: isCommitExist.id,
      },
    });

    await prisma.modifiedFile.deleteMany({
      where: {
        commitId: isCommitExist.id,
      },
    });

    await prisma.diffFile.deleteMany({
      where: {
        commitId: isCommitExist.id,
      },
    });
    await prisma.deleteFile.deleteMany({
      where: {
        commitId: isCommitExist.id,
      },
    });

    const updateCommitData = await prisma.commit.update({
      where: {
        id: isCommitExist.id!,
      },
      data: {
        additionFile: {
          create: created,
        },
        modifiedFile: {
          create: modified,
        },
        diffFile: {
          create: diffData,
        },
        deleteFile: {
          create: deleted,
        },
        status: "Requested",
      },
    });

    if (updateCommitData) {
      return NextResponse.json({ commitRes: updateCommitData });
    } else {
      return NextResponse.json({
        status: 500,
        message: "Failed to update commit",
      });
    }
  }
  try {
    console.log(created, modified, diffData, deleted);

    const commitRes = await prisma.commit.create({
      data: {
        branch: branch,
        repo: repo,
        user: {
          connect: {
            id: existingUser.id,
          },
        },
        additionFile: {
          create: created,
        },
        modifiedFile: {
          create: modified,
        },
        diffFile: {
          create: diffData,
        },
        deleteFile: {
          create: deleted,
        },
        status: "Requested",
      },
    });

    console.log(commitRes);

    return NextResponse.json({ commitRes });
  } catch (err) {
    console.log(err);
  }

  return NextResponse.json({ status: 500, message: "Failed to sync commit" });
}

export async function GET(req: NextRequest) {
  try {
    const username = req.nextUrl.searchParams.get("username")!;

    const user = await prisma.user.findFirst({
      where: { username: username },
    });
    if (!user) {
      throw new Error("User not found");
    }

    const commit = await prisma.commit.findMany({
      where: {
        user: {
          id: user.id,
        },
      },
      include: {
        additionFile: true,
        deleteFile: true,
        diffFile: true,
        user: true,
      },
    });

    if (!commit) {
      throw new Error("No commit found");
    }

    return NextResponse.json({ user: user, commit: commit });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Failed to fetch requests",
    });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();

    const { username, message, time, isSlack, isForce, commitId, commit_desc } =
      body;

    if (message == "") {
      return NextResponse.json({
        status: 404,
        message: "No Commit message found!",
      });
    }

    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });

    if (!user) {
      return NextResponse.json({ status: 404, message: "No User Found!" });
    }

    const commit = await prisma.commit.findFirst({
      where: {
        id: commitId,
        user: {
          id: user.id,
        },
      },
      include: {
        additionFile: true,
        deleteFile: true,
        diffFile: true,
      },
    });

    if (!commit) {
      return NextResponse.json({ status: 404, message: "No Commit Found!" });
    }

    const updateCommitRes = await prisma.commit.update({
      where: {
        id: commit.id,
      },
      data: {
        branch: commit.branch,
        commit_message: message,
        commit_desc: commit_desc,
        repo: commit.repo,
        status: "Scheduled",
        isForce: isForce,
        isSlack: isSlack,
        scheduled_time: time,
      },
    });

    if (!updateCommitRes) {
      return NextResponse.json({ status: 500, message: "Some error occured" });
    }

    const data = await getUserRepos(user, commit.repo, commit.branch);
    return NextResponse.json({
      status: 200,
      data: data,
      message: "Commit Updated Successfully!",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      status: 500,
      message: "Some Internal Server Occured",
    });
  }
}

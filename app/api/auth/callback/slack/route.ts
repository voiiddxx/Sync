import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {

    const code = req.nextUrl.searchParams.get("code");
    const username = req.nextUrl.searchParams.get("state");


    const user = await prisma.user.findFirst({
      where: {
        username: username!,
      }
    });

    if (!user) {
      return NextResponse.json({
        status: 404,
        message: 'No user found'
      });
    }



    if (!code) {
      return NextResponse.json({
        error: 400,
        message: "Missing code parameter!",
      });
    }

    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_SLACK_CLIENT_ID!,
      client_secret: process.env.NEXT_PUBLIC_SLACK_CLIENT_SECRET!,
      code: code as string,
      redirect_uri: process.env.NEXT_PUBLIC_SLACK_REDIRECT_URI!,
    });

    const res = await axios.post(
      "https://slack.com/api/oauth.v2.access",
      params.toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (res.status !== 200 || !res.data.ok) {
      console.error("Slack API error:", res.data);
      return NextResponse.json({
        status: res.status,
        error: res.data.error || "An error occurred!",
      });
    }

    const updateUser = await prisma.user.update({
      where: {
        id: user.id!
      },
      data: {
        slack_access_token: res.data.access_token
      }
    });

    console.log(updateUser);

    return NextResponse.redirect("http://localhost:3000/dashboard");
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json({
      error: 500,
      message: "Internal Server Error!",
    });
  }
}

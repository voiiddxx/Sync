import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url); // Correctly using URL and searchParams

  const code = searchParams.get('code');
  const username = searchParams.get('state');

  if (!username) {
    return NextResponse.json({
      status: 400,
      message: "Missing state parameter!",
    });
  }

  const user = await prisma.user.findFirst({
    where: { username: username },
  });

  if (!user) {
    return NextResponse.json({ status: 404, message: "No user found" });
  }

  if (!code) {
    return NextResponse.json({
      status: 400,
      message: "Missing code parameter!",
    });
  }

  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!,
    client_secret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET!,
    code: code,
  });

  try {
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      params.toString(),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    if (response.status !== 200) {
      return NextResponse.json({
        status: response.status,
        error: response.data.error || "An error occurred!",
      });
    }

    // Handle success, for example, save tokens to the database
    await prisma.user.update({
      where: { id: user.id! },
      data: {
        github_access_token: response.data.access_token,
      },
    });

    return NextResponse.redirect('http://localhost:3000/dashboard');
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json({
      status: 500,
      message: "Internal Server Error!",
    });
  }
}

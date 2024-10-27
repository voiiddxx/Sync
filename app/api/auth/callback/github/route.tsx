// import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
// import axios from 'axios';

import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url); // Correctly using URL and searchParams

//   const code = searchParams.get('code');
//   const username = searchParams.get('state');

//   if (!username) {
//     return NextResponse.json({
//       status: 400,
//       message: "Missing state parameter!",
//     });
//   }

//   const user = await prisma.user.findFirst({
//     where: { username: username },
//   });

//   if (!user) {
//     return NextResponse.json({ status: 404, message: "No user found" });
//   }

//   if (!code) {
//     return NextResponse.json({
//       status: 400,
//       message: "Missing code parameter!",
//     });
//   }

//   const params = new URLSearchParams({
//     client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!,
//     client_secret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET!,
//     code: code,
//   });

//   try {
//     const response = await axios.post(
//       'https://github.com/login/oauth/access_token',
//       params.toString(),
//       {
//         headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//       }
//     );

//     if (response.status !== 200) {
//       return NextResponse.json({
//         status: response.status,
//         error: response.data.error || "An error occurred!",
//       });
//     }

//     // Handle success, for example, save tokens to the database
//     await prisma.user.update({
//       where: { id: user.id! },
//       data: {
//         github_access_token: response.data.access_token,
//       },
//     });

//     return NextResponse.redirect('http://localhost:3000/dashboard');
//   } catch (error) {
//     console.error("Internal Server Error:", error);
//     return NextResponse.json({
//       status: 500,
//       message: "Internal Server Error!",
//     });
//   }
// }



export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url); 
    const code = url.searchParams.get("code");

    if (!code) {
      throw new Error("No code provided");
      return;
    }

    // exchanging github token for access token
    const jsonDataBody = {
      client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
      client_secret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET,
      code,
      redirect_uri: process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URL,
    };
    const response = await axios.post(
      "https://github.com/login/oauth/access_token",
      jsonDataBody,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    const { access_token } = await response.data;

    if (!access_token) {
      throw new Error("No access token provided");
      return;
    }

    
    // fetching user github data
    const userRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const data = await userRes.json();

    

    if (!data) {
      throw new Error("Error occured");
      return;
    }

    // store the user impo infromation in db using prisma

    if (data) {
      const existingUser = await prisma.user.findFirst({
        where: { username: data?.login },
      });

      if (existingUser) {
        const redirectUrl = new URL("http://localhost:3000");
        redirectUrl.searchParams.append("username", data.login);
        return NextResponse.redirect(redirectUrl);
      }

      const userResponse = await prisma.user.create({
        data: {
          email: data?.email || "",
          username: data.login,
          bio: data.bio,
          github_access_token: access_token,
          github_avatar_url: data.avatar_url,
        },
      });

      if (!userResponse) {
        throw new Error("Some Error occured");
      }

      const redirectUrl = new URL("http://localhost:3000");
      redirectUrl.searchParams.append("username", userResponse.username);
      return NextResponse.redirect(redirectUrl);
    }
  } catch (error) {
    console.log("Error: ", error);
    throw new Error("Internal Server Error");
  }
}
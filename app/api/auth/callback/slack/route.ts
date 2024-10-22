import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get("code");

    console.log("This is the code we have:", code);

    if (!code) {
      return NextResponse.json({
        error: 400,
        message: "Missing code parameter!",
      });
    }

    const params = new URLSearchParams({
    //   client_id: '8b981ce94203e8ae75d15c1d27a359ff',  "Update it later"
      client_secret: '6474fa8edde0ec6ae8608008473f0657', // Use the corrected variable
      code: code as string,
      redirect_uri: 'https://welsh-operators-tragedy-landing.trycloudflare.com/api/auth/callback/slack',
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

    console.log("Slack OAuth Response:", res.data);

    return NextResponse.redirect("http://localhost:3000/dashboard");
  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json({
      error: 500,
      message: "Internal Server Error!",
    });
  }
}

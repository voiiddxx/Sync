'use client'

import Link from "next/link";



export default function Home() {


  const scope = "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";
  const response_type = "code";
  const prompt = "consent";

  const GITHUB_AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URL}&scope=repo,workflow,admin:repo_hook,user`;
  // const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=${response_type}&scope=${scope}`
  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=1090994010387-knmd5brtgh8g401kfu4fgntrf6lp93oc.apps.googleusercontent.com&redirect_uri=http://loaclhost:3000/api/auth/callback/google&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile`


  console.log(GOOGLE_AUTH_URL);
  
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Link href={GITHUB_AUTH_URL}>
      <div className="h-16 w-40 bg-black rounded-2xl flex items-center justify-center" >
      <p className="text-xs text-white" >Connect to github</p>
      </div></Link>
      <Link href={GOOGLE_AUTH_URL}>
      <div className="h-16 w-40 bg-black rounded-2xl flex items-center justify-center" >
      <p className="text-xs text-white" >Connect to google</p>
      </div></Link>
      </div>
  );
}

'use client'

import Link from "next/link";



export default function Home() {

  const GITHUB_AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URL}&scope=repo,workflow,admin:repo_hook,user`;

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Link href={GITHUB_AUTH_URL}>
      <div className="h-16 w-40 bg-black rounded-2xl flex items-center justify-center" >
      <p className="text-xs text-white" >Connect to github</p>
      </div></Link>
      </div>
  );
}

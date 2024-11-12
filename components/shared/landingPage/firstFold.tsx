import { GlobeDemo } from "@/components/ui/GitGlobe";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import GradientButton from "../gradient-button";

const FirstFold = () => {
  const GITHUB_AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URL}&scope=repo,workflow,admin:repo_hook,user`;

  return (
    <>
      <div className="h-[600px] overflow-hidden w-full border-b relative">
        <div className=" h-full w-full relative z-50" >
        <h1 className="text-white/80 text-4xl font-Poppins  font-medium  " >Automate Your Workflow</h1>
        <h1 className="text-white/80 text-4xl font-Poppins  font-medium  " >With Flow</h1>
        <p className="text-white/50 font-Poppins font-normal mt-6" >Fumadocs is a beautiful documentation framework with a complete toolchain, <br /> powered by Next.js App Router. Designed to be flexible and fast.</p>

        <div className=" flex" >
          
        </div>
        </div>
      <div>
        <Image className="w-auto absolute  bottom-0 z-10 " src={`/bg.svg`} height={1500} width={1500} alt="image" />
      </div>
      </div>
    </>
  );
};

export default FirstFold;

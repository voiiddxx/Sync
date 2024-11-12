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
      <div className="h-[700px] overflow-hidden w-full border-b relative">
        <div className=" h-full w-full relative z-50 p-16">
          <h1 className="text-white/80 text-4xl font-mono  font-medium  ">
            Automate your github workflows{" "}
          </h1>
          <h1 className="text-white/80 text-4xl mt-1 font-mono  font-medium  ">
            with less effort
          </h1>
          <p className="text-white/50 font-Poppins text-[18px] font-normal  mt-8">
            Boost your productivity on GitHub with the floww seamless,
            user-friendly tool for developers
            <br /> Whether you're scheduling issues
          </p>

          <div className=" flex items-center gap-3 mt-8">
            <div className="px-4 py-2 rounded-full  border-white/20 bg-gradient-to-b from-[#ddd] to-[#afafaf] flex items-center justify-center">
              <p className="text-sm text-black  font-Poppins">
                Getting Started
              </p>
            </div>
            <div className="px-4 py-2 rounded-full border border-white/20 bg-[#262626] flex items-center justify-center">
              <p className="text-sm text-white/50  font-Poppins">
                Start on github
              </p>
            </div>
          </div>

          <div className=" h-96 w-full bg-[#262626] border-4 border-[#4c4c4c] rounded-md absolute ml-10 mt-10 object-contain">
            <Image
              src={`/dashboard.png`}
              height={1500}
              width={1500}
              alt="image"
            />
          </div>
        </div>
        <div>
          <Image
            className=" h-full object-cover w-full absolute  bottom-0 z-10 "
            src={`/bg.svg`}
            height={1500}
            width={1500}
            alt="image"
          />
        </div>
      </div>
    </>
  );
};

export default FirstFold;

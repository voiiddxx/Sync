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
      <div className="h-[830px] overflow-hidden w-full border-b border-[#262626] relative">
        <div className=" h-full w-full relative z-50 md:p-16 p-8">
          <h1 className="text-white md:text-4xl text-4xl font-mono  text-center md:text-left font-medium  ">
            Automate your github workflows{" "}
          </h1>
          <h1 className="text-white md:text-4xl text-xl mt-2 font-mono  font-medium  hidden md:inline-block    ">
            with less effort and ease
          </h1>
          <p className="text-white/50 font-Poppins md:text-[18px] text-base text-center md:text-left md:mt-8 mt-6">
            Simplify your development workflow by automating commit and PR
            scheduling
            <span className="hidden md:inline-block mt-1">
              saving time, boosting productivity, and focusing on coding
              brilliance.
            </span>
          </p>

          <div className=" flex items-center gap-3 mt-8 justify-center md:justify-start">
            <Link target="_blank" href={`https://github.com/voiiddxx`}>
              <div className="px-4 py-2 rounded-full  border-white/20 bg-gradient-to-b from-[#ddd] to-[#afafaf] flex items-center justify-center">
                <p className="text-[12px] text-black  font-Poppins font-medium">
                  Comming Soon
                </p>
              </div>
            </Link>
            <Link target="_blank" href={`https://github.com/voiiddxx`} >
              <div className="px-4 py-2 rounded-full border border-white/20 bg-[#262626] flex items-center justify-center">
                <p className="text-[12px] text-white/50  font-Poppins">
                  Star on github
                </p>
              </div>
            </Link>
          </div>

          <div className=" h-72 md:h-[500px] w-full bg-[#262626] border-4 border-[#4c4c4c] rounded-md absolute ml-10 mt-10 object-contain">
            <Image
              className="h-full w-full object-cover md:object-top"
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

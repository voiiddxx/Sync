"use client";

import React, { useState } from "react";
import NavBar from "./navbar";
import FirstFold from "./firstFold";
import { useSelector } from "react-redux";
import Image from "next/image";
import { CheckCheck, Terminal } from "lucide-react";
import SecondFold from "./secondfold";
import ThirdFold from "./thirfFold";
import {
  CopyIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";

const LandingPage = () => {
  const darkmode = useSelector((state: any) => state.window.darkMode);
  const [copied, setcopied] = useState<boolean>(false);
  return (
    <div className={`${darkmode ? "dark" : ""}`}>
      <div
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
        className=" w-full min-h-screen h-screen overflow-scroll bg-[#050505] dark:bg-[#050505] "
      >

        {/* <div className="absolute h-96 top-40 opacity-45 w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent" >
          <Image className="h-full w-full object-cover" src={`bg.svg`} height={1000} width={1500} alt="bg" />
        
        </div> */}
        <div className=" w-full sticky top-0 z-50">
          <NavBar />
        </div>

        <div className=" w-auto md:px-[27vh] px-2 md:mt-10 top-5 relative z-20">
          <div className=" w-auto min-h-[1600px] border border-[#262626] relative ">
            <FirstFold />
            <div className=" w-full overflow-hidden border-[#262626] flex items-center justify-center mt-10 flex-col border-t h-64 border-b relative ">
              <Terminal strokeWidth={3} className="text-white mb-2" />
              <h1 className="text-white text-2xl font-mono tracking-wider font-semibold z-50 text-center">
                Sync With Flow
              </h1>
              <h1 className="text-white text-2xl font-mono tracking-wider font-semibold text-center z-50">
                Then schedule on Flow
              </h1>
              <div className=" h-2 w-full absolute  bottom-0 bg-gradient-to-r from-transparent via-[#ffb25a] to-transparent "></div>
            </div>

            <SecondFold />

            <div className=" w-full md:min-h-[450px] min-h-72 border-b overflow-hidden relative flex border-[#262626] items-center flex-col justify-center md:px-56">
              <h1 className=" font-mono text-2xl md:text-4xl text-white font-semibold text-center z-50 relative ">
                Connect your <span className="text-[#6f6f6f]">workspaces</span>{" "}
              </h1>
              <p className="text-white/50 text-center px-10 text-sm md:text-balance font-Poppins mt-4 relative z-50 ">
                Effortlessly connect and manage multiple Git accounts in one
                place. With Flow, streamline your commits and stay organized
                like never before
                <span className="hidden md:inline-block"></span>
              </p>
              <div className="px-5 mt-6 py-3 rounded-full z-50 cursor-pointer  border-white/20 drop-shadow-lg bg-gradient-to-b from-[#fff] to-[#f0f0f0] flex items-center justify-center shadow-lg">
                <p className="text-sm text-black font-semibold  font-Poppins">
                  Comming Soon
                </p>
              </div>

              <Image
                className="absolute opacity-25 grayscale hover:grayscale-0 transition-all hover:scale-110 top-10 drop-shadow-md decoration-fuchsia-300 hover:rotate-90 duration-1000 ease-in-out"
                src={`/globe.png`}
                height={1500}
                width={1500}
                alt="flow"
              />
            </div>

            <ThirdFold />

            <div className=" w-full h-96 mt-12 flex items-center gap-3 justify-center border-t flex-col border-b relative overflow-hidden border-[#262626]">
              <h1 className="text-4xl text-white font-extralight  z-50 tracking-wide text-center">
                Automate Your{" "}
                <span className="text-white/70">Workflow Now</span>
              </h1>
              <div className=" px-4 py-2 z-50 border bg-gradient-to-r mt-4 border-[#515151] cursor-pointer from-[#262626] to-[#161616] rounded-full flex items-center justify-center">
                <h1 className="text-white z-50 font-Poppins font-extralight text-sm ">
                  $ git sync -u username
                </h1>
                {!copied ? (
                  <CopyIcon
                    onClick={() => {
                      navigator.clipboard.writeText("git sync -u username");
                      setcopied(true);
                    }}
                    className="size-4 ml-6 text-white"
                  />
                ) : (
                  <CheckCheck className="size-4 ml-6 text-white" />
                )}
              </div>
              <Image
                className="absolute opacity-25 grayscale hover:grayscale-0 transition-all hover:scale-110 top-10 drop-shadow-md decoration-fuchsia-300 hover:rotate-2 duration-1000 ease-in-out"
                src={`/plastic.svg`}
                height={1500}
                width={1500}
                alt="flow"
              />
            </div>
          </div>
        </div>
        <div className=" w-full h-48 mt-12 border-t bg-[#0d0d0d] border-[#262626] relative overflow-hidden flex items-center justify-between md:px-20 px-4 pt-10 ">
          <div>
            <h1 className="text-white/70 font-mono md:text-lg text-sm    ">
              Flow by voiiddxx
            </h1>
            <p className="text-white/40 text-xs font-Poppins">
              Connect with <span className="underline">voiiddxx</span>
            </p>
          </div>
          <div className=" flex items-center gap-4 mr-4">
            <GitHubLogoIcon className="text-white/50 md:size-5 size-4" />
            <TwitterLogoIcon className="text-white/50 md:size-5 size-4" />
            <LinkedInLogoIcon className="text-white/50 md:size-5 size-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

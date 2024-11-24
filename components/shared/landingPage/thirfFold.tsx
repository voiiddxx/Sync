import { TerminalSquare } from "lucide-react";
import Image from "next/image";
import React from "react";

const ThirdFold = () => {
  return (
    <div className=" mt-16 border-t w-full min-h-[600px] border-b border-[#262626]">
      {/* first flex */}
      <div className=" w-full h-1/2 md:flex border-b items-center border-[#262626] justify-center">
        <div className=" md:w-1/2 h-[600px] border-b md:border-b-transparent border-[#262626] overflow-hidden border-r md:pl-16 pl-4 pt-16 relative">
          <div className="flex items-center gap-2">
            <TerminalSquare className="text-[#7e7e7e]" />
            <h1 className="md:text-lg text-sm text-white/60 font-Poppins">
              Synced Workspaces
            </h1>
          </div>
          <h1 className="text-white md:text-2xl text-lg font-Poppins tracking-normal mt-6">
            From localhost to https, in seconds. <br />{" "}
            <span className="text-white/60"> Deploy from Git or your CLI</span>
          </h1>

          <Image
            className="mt-16 opacity-25 hover:scale-110 transition-all duration-500"
            src={`/syncflow.svg`}
            height={1500}
            width={1500}
            alt="commit"
          />
          <Image
            className="mt-16 absolute top-40 backdrop-blur-sm hover:scale-105 transition-all duration-500 left-10 z-20"
            src={`/syncflow.svg`}
            height={1500}
            width={1500}
            alt="commit"
          />

          {/* first box content end */}
        </div>

        <div className=" md:w-1/2 h-[600px] border-b md:border-b-transparent border-[#262626] overflow-hidden border-r md:pl-16 pl-4 pt-16 relative">
          <div className="flex items-center gap-2">
            <TerminalSquare className="text-[#7e7e7e]" />
            <h1 className="md:text-lg text-sm text-white/60 font-Poppins">
              Synced Workspaces
            </h1>
          </div>
          <h1 className="text-white md:text-2xl text-lg font-Poppins tracking-normal mt-6">
            From localhost to https, in seconds. <br />{" "}
            <span className="text-white/60"> Deploy from Git or your CLI</span>
          </h1>

          <Image
            className="mt-16 opacity-25 hover:scale-110 transition-all duration-500"
            src={`/streak.svg`}
            height={1500}
            width={1500}
            alt="commit"
          />
          <Image
            className="mt-16 absolute top-40 backdrop-blur-sm  hover:scale-105 transition-all duration-500 left-40 z-20"
            src={`/streak.svg`}
            height={1500}
            width={1500}
            alt="commit"
          />

          {/* first box content end */}
        </div>
      </div>
    </div>
  );
};

export default ThirdFold;

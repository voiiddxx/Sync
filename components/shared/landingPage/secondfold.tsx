import { TerminalSquare } from "lucide-react";
import Image from "next/image";
import React from "react";

const SecondFold = () => {
  return (
    <div className=" mt-16 border-t w-full min-h-[600px] border-b">
      {/* first flex */}
      <div className=" w-full h-1/2 flex border-b items-center justify-center">
        <div className=" w-1/2 h-[600px] overflow-hidden border-r pl-16 pt-16 relative">
          <div className="flex items-center gap-2">
            <TerminalSquare className="text-[#7e7e7e]" />
            <h1 className="text-lg text-white/60 font-Poppins">
              Synced Workspaces
            </h1>
          </div>
          <h1 className="text-white text-2xl font-Poppins tracking-normal mt-6">
            From localhost to https, in seconds. <br />{" "}
            <span className="text-white/60"> Deploy from Git or your CLI</span>
          </h1>

          <Image
            className="mt-16 opacity-25 hover:scale-110 transition-all duration-500"
            src={`/commit.svg`}
            height={1500}
            width={1500}
            alt="commit"
          />
          <Image
            className="mt-16 absolute top-40 backdrop-blur-sm hover:scale-105 transition-all duration-500 left-40 z-20"
            src={`/commit.svg`}
            height={1500}
            width={1500}
            alt="commit"
          />

          {/* first box content end */}
        </div>

        <div className=" w-1/2 h-[600px] overflow-hidden border-r pl-16 pt-16 relative">
          <div className="flex items-center gap-2">
            <TerminalSquare className="text-[#7e7e7e]" />
            <h1 className="text-lg text-white/60 font-Poppins">
              Synced Workspaces
            </h1>
          </div>
          <h1 className="text-white text-2xl font-Poppins tracking-normal mt-6">
            From localhost to https, in seconds. <br />{" "}
            <span className="text-white/60"> Deploy from Git or your CLI</span>
          </h1>

          <Image
            className="mt-16 opacity-25 hover:scale-110 transition-all duration-500"
            src={`/accounts.svg`}
            height={1500}
            width={1500}
            alt="commit"
          />
          <Image
            className="mt-16 absolute top-40 backdrop-blur-sm hover:scale-105 transition-all duration-500 left-40 z-20"
            src={`/accounts.svg`}
            height={1500}
            width={1500}
            alt="commit"
          />

          {/* first box content end */}
        </div>
      </div>
      <div className=" w-full h-1/2 flex border-b items-center justify-center">
        <div className=" w-1/2 h-[600px] overflow-hidden border-r pl-16 pt-16 relative">
          <div className="flex items-center gap-2">
            <TerminalSquare className="text-[#7e7e7e]" />
            <h1 className="text-lg text-white/60 font-Poppins">
              Synced Workspaces
            </h1>
          </div>
          <h1 className="text-white text-2xl font-Poppins tracking-normal mt-6">
            From localhost to https, in seconds. <br />{" "}
            <span className="text-white/60"> Deploy from Git or your CLI</span>
          </h1>

          <Image
            className="mt-16  hover:scale-110 transition-all duration-500"
            src={`/comments.svg`}
            height={1500}
            width={1500}
            alt="commit"
          />

          {/* first box content end */}
        </div>

        <div className=" w-1/2 h-[600px] overflow-hidden border-r pl-16 pt-16 relative">
          <div className="flex items-center gap-2">
            <TerminalSquare className="text-[#7e7e7e]" />
            <h1 className="text-lg text-white/60 font-Poppins">
              Synced Workspaces
            </h1>
          </div>
          <h1 className="text-white text-2xl font-Poppins tracking-normal mt-6">
            From localhost to https, in seconds. <br />{" "}
            <span className="text-white/60"> Deploy from Git or your CLI</span>
          </h1>

          <Image
            className="mt-16 opacity-25 hover:scale-110 transition-all duration-500"
            src={`/terminal.svg`}
            height={1500}
            width={1500}
            alt="commit"
          />
          <Image
            className="mt-16 absolute top-40  hover:scale-105 transition-all duration-500 left-40 z-20"
            src={`/terminal.svg`}
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

export default SecondFold;

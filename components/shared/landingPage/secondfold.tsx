import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { MessageCircleDashed, TerminalSquare, TreePalmIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const SecondFold = () => {
  return (
    <div className=" mt-16 border-t w-full min-h-[600px] border-b border-[#262626] ">
      {/* first flex */}
      <div className=" w-full h-1/2 md:flex border-b border-[#262626] items-center justify-center">
        <div className=" md:w-1/2 h-[600px] border-b md:border-b-transparent border-[#262626] overflow-hidden border-r md:pl-16 pl-4 pt-16 relative">
          <div className="flex items-center gap-2">
            <GitHubLogoIcon className="text-[#262626] size-5" />
            <h1 className="text-sm md:text-sm text-white/60  font-Poppins font-light">
            Your Workspace – Meet Flow
            </h1>
          </div>
          <h1 className="text-white md:text-xl md:mr-6 text-lg font-Poppins tracking-normal mt-6">
          Manage, schedule, and sync all your GitHub commits and  {" "}
            <span className="text-white/60"> and PRs </span>
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

        <div className="md:w-1/2 h-[600px] border-b md:border-b-transparent border-[#262626] overflow-hidden border-r md:pl-16 pl-4 pt-16 relative">
          <div className="flex items-center gap-2">
            <TerminalSquare className="text-[#282828] size-5" />
            <h1 className="md:text-sm text-sm text-white/60 font-light font-Poppins">
            Manage Multiple Git Accounts
            </h1>
          </div>
          <h1 className="text-white md:text-xl text-lg font-Poppins tracking-normal mt-6 mr-4">
          Effortlessly sync, schedule, and manage {" "}
            <span className="text-white/60"> multiple gitHub accounts </span>
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
      <div className=" w-full h-1/2 md:flex border-b border-[#262626] items-center justify-center">
        <div className="md:w-1/2 h-[600px] border-b md:border-b-transparent border-[#262626] overflow-hidden border-r md:pl-16 pl-4 pt-16 relative">
          <div className="flex items-center gap-2">
            <MessageCircleDashed className="text-[#262626] size-5" />
            <h1 className="md:text-sm text-sm text-white/60 mt-1 font-Poppins font-light">
            Effortlessly Comment on Commits
            </h1>
          </div>
          <h1 className="text-white md:text-xl text-lg font-Poppins tracking-normal mt-6">
          Keep your team aligned by adding <br />{" "}
            <span className="text-white/60"> comments to your commits</span>
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

        <div className="md:w-1/2 h-[600px] border-b md:border-b-transparent border-[#262626] overflow-hidden border-r md:pl-16 pl-4 pt-16 relative">
          <div className="flex items-center gap-2">
            <TreePalmIcon className="text-[#262626] size-5" />
            <h1 className="md:text-sm text-sm text-white/60 font-Poppins font-light">
              Synced Workspaces
            </h1>
          </div>
          <h1 className="text-white md:text-xl text-lg font-Poppins tracking-normal mt-6">
          Sync your local codebase to flow . <br />{" "}
            <span className="text-white/60">  with git sync command</span>
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

import {
  ChevronDoubleDownIcon,
  ChevronDownIcon,
  ClockIcon,
  CubeIcon,
  DocumentArrowUpIcon,
  ForwardIcon,
  ServerIcon,
  ShareIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

import {
  GitBranchIcon,
  GitCommit,
  GithubIcon,
  LucideLink2,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const EditCommit = ({ data, closeModal }: any) => {

    const user = useSelector((state:any)=>state.user.value);
  const filePath = [
    {
      path: "/src/index.js",
    },
    {
      path: "/src/utlis.js",
    },
    {
      path: "/src/dashboard.tsx",
    },
  ];
  return (
    <div className=" min-h-[500px]  w-full px-4 py-4 font-Poppins pb-4">
      <div className=" w-full flex justify-between">
        <div className=" flex items-center gap-2">
          <div className="h-9 w-9 shadow-sm flex items-center justify-center rounded-md border">
            <CubeIcon className="size-5" />
          </div>
          <div>
            <p className="text-sm font-Poppins font-medium">Commit overview</p>
            <p className="font-Poppins text-xs text-gray-800">
              Manage your changes and schedule commit
            </p>
          </div>
        </div>
      </div>

      <div className="min-h-20 w-full bg-zinc-50 rounded-lg mt-10 px-3 py-3">
        <div className="w-full flex justify-between items-center gap-2">
          <div>
            <p className="text-sm font-medium">Direct link</p>
            <p className="text-xs font-medium text-zinc-600 tracking-tight">
              Anyone can view the commit details
            </p>
          </div>
          <div className="px-2 py-2 rounded-md flex items-center justify-center gap-1 border shadow-sm bg-white">
            <p className="text-xs font-medium text-gray-800">SHA link</p>
            <ChevronDownIcon className="size-3" />
          </div>
        </div>
        <div className="h-10 w-full px-4 flex items-center justify-between rounded-lg bg-white border border-zinc-200 mt-4">
          <div className=" flex gap-2">
            <LucideLink2 className="size-4 transform -rotate-45" />
            <p className="text-xs text-zinc-900 font-medium">
              github.com/voiiddxx/floww/commits/globes/59551
            </p>
          </div>
          <p className="text-xs text-zinc-900 font-medium">Copy link</p>
        </div>
      </div>

      <p className="text-xs   tracking-tight text-gray-600 mt-6">
        Commit message
      </p>
      <div className=" w-full flex items-center justify-between gap-2 mt-3">
        <div className=" h-10 w-full border rounded-lg  px-2 flex items-center justify-center">
          <GithubIcon
            className="mr-2 text-gray-500"
            size={15}
            strokeWidth={2.25}
          />
          <input
            className="outline-none border-none text-xs w-full h-full"
            placeholder="Write or generate commit message"
            type="text"
          />
        </div>
        <div className="">
          <div className="bg-purple-600 px-2 py-2 rounded-lg shadow-sm border ">
            <SparklesIcon className="size-5 text-white" />
          </div>
        </div>
      </div>

      <div className=" w-full  mt-6">
        <p className="text-xs  mt-2 tracking-tight text-gray-600">
          Files Changes
        </p>
        <div className="flex flex-col gap-2 mt-3">
          {filePath.map((curr: any) => {
            return (
              <div className=" w-full flex items-center justify-between">
                <div className=" flex gap-1 items-center">
                  <div className=" px-1 py-1 rounded-md bg-zinc-100">
                    <DocumentArrowUpIcon className="size-4 text-zinc-600" />
                  </div>
                  <p className="text-xs font-medium ml-2">{curr.path}</p>
                </div>

                <ForwardIcon className="size-4 text-zinc-600" />
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-xs  mt-6 tracking-tight text-gray-600">Additinols</p>
      <div className=" w-full flex items-center justify-start mt-3 gap-4">
        <div className=" px-2 py-1 flex items-center justify-center gap-2 bg-green-50 rounded-full border border-green-200">
          <ServerIcon className="text-green-500 size-3" />
          <p className="text-xs font-medium text-green-500">Echo</p>
        </div>
        <div className=" px-2 py-1 flex items-center justify-center gap-2 bg-orange-50 rounded-full border border-orange-200">
          <GitBranchIcon size={15} className="text-orange-600" />
          <p className="text-xs font-medium text-orange-500">sandbox-master</p>
        </div>
        <div className=" px-2 py-1 flex items-center justify-center gap-2 bg-pink-100 rounded-full border border-pink-300">
          <ClockIcon className="size-3 text-pink-500" />
          <p className="text-xs font-medium text-pink-500">Requested</p>
        </div>
      </div>

      <div className=" w-full flex items-center justify-between  mt-14" >
          <div className=" flex gap-2 items-center" >
            <div className="h-6 w-6 bg-black rounded-full flex items-center justify-center" >
            <Image className=" h-full w-full object-cover rounded-full" src={user.github_avatar_url} height={1500} width={1500} alt="logo" />
            </div>
            <p className=" text-xs tracking-tight font-medium" >created by voiddxx <span className="text-gray-600 font-normal" >4 days ago</span></p>
          </div>

          <div className=" px-4 rounded-lg py-2 bg-gradient-to-b from-purple-700 to-purple-500 flex items-center justify-center" >
            <p className="text-xs  text-white" >Update commit
            </p>
          </div>
      </div>
    </div>
  );
};

export default EditCommit;

import {
  ChevronDoubleDownIcon,
  ChevronUpDownIcon,
  FolderOpenIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { GitBranchIcon, GitForkIcon } from "lucide-react";
import React from "react";

const ActivitySection = () => {
  return (
    <div className=" w-full h-full">
      <div className="h-16 w-full border-b flex justify-between items-center px-3">
        <p className="text-sm">Recent Activities</p>
        <div className=" w-32 rounded-md shadow-sm h-8 px-2 border flex items-center justify-between">
          <div className="flex items-center gap-1">
            <GitBranchIcon className="size-3" />
            <p className="text-sm">main</p>
          </div>
          <div>
            <ChevronUpDownIcon className="size-4" />
          </div>
        </div>
      </div>

      <div className=" flex w-full justify-between px-3 mt-4">
        <div className=" flex items-center gap-2">
          <GitForkIcon strokeWidth={1.5} size={20} className="text-blue-600" />
          <p className="text-sm">5 May 2024</p>
        </div>
        <div>
          <DotsHorizontalIcon className="mr-3" />
        </div>
      </div>

      <div className=" flex flex-col mt-2 px-3 py-2">
        {/* pr card start  */}
        <div className=" h-28 w-full bg-zinc-50 border rounded-md flex flex-col justify-between ">
          <div>
            <div className="flex items-center gap-2 px-2 mt-1">
              <div>
                <div className="h-8 w-8 rounded-full bg-orange-300"></div>
              </div>
              <p className="text-[14px] font-Poppins mt-1 text-black">
                {" "}
                <span className="font-semibold">astro.tsx</span> is requesting
                to merge pull req into{" "}
                <span className=" underline text-indigo-500">master</span>{" "}
                branch
              </p>
            </div>
          </div>
          <div className="w-full flex gap-1 px-10 mb-4">
            <div className="px-2 py-1 border border-gray-300 bg-white rounded-md">
              <p className="text-[12px] font-Poppins text-blue-600">Schedule</p>
            </div>
            <div className="px-2 py-1 border bg-white rounded-md">
              <p className="text-[12px]  font-Poppins text-red-600">Decline</p>
            </div>
          </div>
        </div>
        <div className=" h-28 w-full bg-zinc-50 border rounded-md flex flex-col justify-between mt-2">
          <div>
            <div className="flex items-center gap-2 px-2 mt-1">
              <div>
                <div className="h-8 w-8 rounded-full bg-orange-300"></div>
              </div>
              <p className="text-[14px] font-Poppins mt-1 text-black">
                {" "}
                <span className="font-semibold">voiiddxx</span> is requesting to
                merge pull req into{" "}
                <span className=" underline text-indigo-500">master</span>{" "}
                branch
              </p>
            </div>
          </div>
          <div className="w-full flex gap-1 px-10 mb-4">
            <div className="px-2 py-1 border border-gray-300 bg-white rounded-md">
              <p className="text-[12px] font-Poppins text-blue-600">Schedule</p>
            </div>
            <div className="px-2 py-1 border bg-white rounded-md">
              <p className="text-[12px]  font-Poppins text-red-600">Decline</p>
            </div>
          </div>
        </div>
        {/* pr card end */}

        <div className="h-[1px] w-full bg-zinc-300 mt-4"></div>
        <div className="mt-4">
          <div className="w-full flex justify-between">
            <div className="flex w-full pb-2  items-center gap-2 border-b">
              <div className="h-6 w-6 bg-zinc-50  rounded-md border flex items-center justify-center">
                <RectangleStackIcon className="size-4" />
              </div>
              <p className="text-sm text-gray-800">Active Repositories</p>
            </div>
          </div>

          <div className="mt-3">
            <div className="h-16 border-b">
              <div className=" flex items-center">
                <FolderOpenIcon className="size-4 text-gray-600" />
                <p className="text-gray-600 text-sm font-Poppins tracking-tight ml-2">
                  {" "}
                  <span className="text-black">voiiddxx</span>
                  /facebookscrapper-website
                </p>
              </div>
              <p className="line-clamp-1 text-xs font-Poppins mt-2 text-gray-600 ">
                The website designed to make custom flow using next js
                typescript and prisma
              </p>
            </div>
            <div className="h-20 pt-4 border-b">
              <div className="flex items-center">
                <FolderOpenIcon className="size-4 text-gray-600" />
                <p className="text-gray-600 text-sm font-Poppins tracking-tight ml-2">
                  {" "}
                  <span className="text-black">voiiddxx</span>
                  /facebookscrapper-website
                </p>
              </div>
              <p className="line-clamp-1 text-xs font-Poppins mt-2 text-gray-600 ">
                The website designed to make custom flow using next js
                typescript and prisma
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitySection;

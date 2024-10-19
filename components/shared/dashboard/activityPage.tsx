import {
  ChevronDoubleDownIcon,
  ChevronUpDownIcon,
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

      <div className=" flex flex-col mt-4 px-3 py-2">
        {/* pr card start  */}
        <div className=" h-32 w-full bg-gray-50 border rounded-md flex flex-col justify-between">
          <div className="flex items-center gap-2 px-2 mt-1">
            <div>
              <div className="h-8 w-8 rounded-full bg-orange-300"></div>
            </div>
            <p className="text-[14px] font-Poppins mt-1 text-black">
              {" "}
              <span className="font-semibold">voiiddxx</span> is requesting to
              merge pull req into{" "}
              <span className=" underline text-indigo-500">master</span> branch
            </p>
          </div>
        </div>
        {/* pr card end */}
      </div>
    </div>
  );
};

export default ActivitySection;

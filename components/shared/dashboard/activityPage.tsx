import {
  BellAlertIcon,
  ChevronDoubleDownIcon,
  ChevronUpDownIcon,
  FolderOpenIcon,
  RectangleStackIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  GitBranchIcon,
  GitCommitHorizontalIcon,
  GitForkIcon,
} from "lucide-react";
import Image from "next/image";
import React from "react";

const ActivitySection = ({ activities }: any) => {
  return (
    <div className=" w-full h-full">
      <div className="flex flex-col mt-2 px-6 py-2">
   
        {/* pr card end */}
        <div className="mt-1">
          <div className="w-full  flex justify-between">
            <div className="flex w-full pb-2  items-center gap-2 border-b">
              <div className="h-6 w-6 bg-zinc-50  rounded-md border flex items-center justify-center">
                <RectangleStackIcon className="size-4" />
              </div>
              <p className="text-sm text-gray-800">Recent Activities</p>
            </div>
          </div>
          <div
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              WebkitOverflowScrolling: "touch",
            }}
            className=" h-[75vh] overflow-y-scroll"
          >
            {activities.map((curr: any) => {
              return <ActivityCard data={curr} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitySection;

export const ActivityCard = (data: any) => {
  const { type, actor, repo, payload } = data.data;

  if (!type && !actor && !repo && !payload) {
    return <div></div>;
  }

  switch (type) {
    case "MemberEvent":
      // return `${actor.login} added a new member to the repository ${repo.name}.`;
      return (
        <div className="mt-3">
          <div className="min-h-16 pb-3 border-b">
            <div className=" flex items-center justify-between">
              <div className="flex items-center">
                <BellAlertIcon className="size-4 text-gray-600" />
                <p className="text-gray-600 text-sm font-Poppins tracking-tight ml-2">
                  {" "}
                  <span className="text-black">{repo?.name}</span>
                </p>
              </div>

              <div className=" flex items-center gap-1 px-2 py-[2px] text-orange-500 bg-orange-100 border border-orange-300 rounded-full">
                <UsersIcon className="size-3" />
                <p className="text-[10px] font-medium font-Poppins">Member</p>
              </div>
            </div>
            <div className=" w-full flex items-center gap-2 mt-2 cursor-pointer">
              <div className="h-8 w-8 rounded-full bg-white mt-1 cursor-pointer ">
                <Image
                  className="rounded-full"
                  src={actor?.avatar_url}
                  height={1500}
                  width={1500}
                  alt="avatar"
                />
              </div>
              <p className="text-[12px] font-Poppins tracking-tight mt-2 text-gray-600  hover:text-indigo-600">
                {actor?.login} added a new member to the repository {repo?.name}
              </p>
            </div>
          </div>
        </div>
      );

    case "CreateEvent":
      if (payload.ref_type === "branch") {
        // return `${actor.login} created a new branch '${payload.ref}' in the repository ${repo.name}.`;
        return (
          <div className="mt-3">
            <div className="min-h-16 pb-3 border-b">
              <div className=" flex items-center justify-between">
                <div className="flex items-center">
                  <BellAlertIcon className="size-4 text-gray-600" />
                  <p className="text-gray-600 text-sm font-Poppins tracking-tight ml-2">
                    {" "}
                    <span className="text-black">{repo?.name}</span>
                  </p>
                </div>

                <div className=" flex items-center gap-1 px-2 py-[2px] text-purple-500 bg-purple-100 border border-purple-300 rounded-full">
                  <GitBranchIcon className="size-3" />
                  <p className="text-[10px] font-medium font-Poppins">Branch</p>
                </div>
              </div>
              <div className=" w-full flex items-center gap-2 mt-2 cursor-pointer">
                <div className="h-8 w-8 rounded-full bg-white mt-1 cursor-pointer ">
                  <Image
                    className="rounded-full"
                    src={actor?.avatar_url}
                    height={1500}
                    width={1500}
                    alt="avatar"
                  />
                </div>
                <p className="text-[12px] font-Poppins tracking-tight mt-2 text-gray-600  hover:text-indigo-600">
                  {actor?.login} created a new branch {payload?.ref} in the
                  repository {repo?.name}
                </p>
              </div>
            </div>
          </div>
        );
      } else if (payload?.ref_type === "repository") {
        // return `${actor.login} created a new repository '${repo.name}'.`;
        return (
          <div className="mt-3">
            <div className="h-16 border-b">
              <div className=" flex items-center">
                <BellAlertIcon className="size-4 text-gray-600" />
                <p className="text-gray-600 text-sm font-Poppins tracking-tight ml-2">
                  {" "}
                  <span className="text-black">{repo?.name}</span>
                </p>
              </div>
              <p className="line-clamp-1 text-xs font-Poppins mt-2 text-gray-600 ">
                The website designed to make custom flow using next js
                typescript and prisma
              </p>
            </div>
          </div>
        );
      }
      break;

    default:
      return (
        <div className="mt-3">
          <div className="min-h-16 pb-3 border-b">
            <div className=" flex items-center justify-between">
              <div className="flex items-center">
                <BellAlertIcon className="size-4 text-gray-600" />
                <p className="text-gray-600 text-sm font-Poppins tracking-tight ml-2">
                  {" "}
                  <span className="text-black">{repo?.name}</span>
                </p>
              </div>

              <div className=" flex items-center gap-1 px-2 py-[2px] text-green-500 bg-green-50 border border-green-300 rounded-full">
                <GitCommitHorizontalIcon className="size-3" />
                <p className="text-[10px] font-medium font-Poppins line-clamp-1">
                  Commit
                </p>
              </div>
            </div>
            <div className=" w-full flex items-center gap-2 mt-2 cursor-pointer">
              <div className="h-8 w-8 rounded-full bg-white mt-1 cursor-pointer ">
                <Image
                  className="rounded-full"
                  src={actor?.avatar_url}
                  height={1500}
                  width={1500}
                  alt="avatar"
                />
              </div>
              <p className="text-[12px] font-Poppins tracking-tight mt-2 text-gray-600  hover:text-indigo-600">
                {actor?.login} have created a commit{" "}
                <span className="font-medium text-purple-600">
                  {
                    payload?.commits?.[0]?.message?.split("\n")[0]??
                    "No commit message"
                  }
                  </span> in{" "}
                {repo?.name}
              </p>
            </div>
          </div>
        </div>
      );
  }

  // return (

  // );
};

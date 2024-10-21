"use client";
import {
  ClockIcon,
  FolderIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/solid";
import {
  DotFilledIcon,
  DotsHorizontalIcon,
  GitHubLogoIcon,
} from "@radix-ui/react-icons";
import { GitBranch, GitBranchIcon, GitCommit } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import { SlackSVGIcon } from "./sideBar";

const ScheduledCommit = ({ data }: any) => {
  const user = useSelector((state: any) => state.user.value);

  const shceduledData = [
    {
      username: "voiiddxx",
      files: [1, 2, 3, 6],
      commitDate: "2021-09-10",
      message: "Slack Integreation Done",
      status: "Scheuled",
      duration: 3,
      branch: "master",
      repo: "Facebook Scrapper",
      commitid: "21541ssdsd51",
    },
    {
      username: "voiiddxx",
      files: [1, 2, 3, 6],
      commitDate: "2021-09-10",
      message: "Slack Integreation Done",
      status: "Scheuled",
      duration: 3,
      branch: "master",
      repo: "Facebook Scrapper",
      commitid: "57s4dwd451",
    },
    {
      username: "voiiddxx",
      files: [1, 2, 3, 6],
      commitDate: "2021-09-10",
      message: "Slack Integreation Done",
      status: "Scheuled",
      duration: 3,
      branch: "master",
      repo: "Facebook Scrapper",
      commitid: "44ssdwd441",
    },
    {
      username: "voiiddxx",
      files: [1, 2, 3, 6],
      commitDate: "2021-09-10",
      message: "Slack Integreation Done",
      status: "Scheuled",
      duration: 3,
      branch: "master",
      repo: "Facebook Scrapper",
      commitid: "csd444714ss",
    },
    {
      username: "voiiddxx",
      files: [1, 2, 3, 6],
      commitDate: "2021-09-10",
      message: "Slack Integreation Done",
      status: "Scheuled",
      duration: 3,
      branch: "master",
      repo: "Facebook Scrapper",
      commitid: "dwdw4dSd4sd1",
    },
  ];
  return (
    <div className="w-full h-full px-4 font-Poppins">
      <p className="text-sm text-gray-500">Sheduled Requests</p>

      <div className=" flex  flex-col mt-4  rounded-md gap-2">
        {data.map((curr: any, index: Number) => {
          return (
            <div className="min-h-40 pb-3 w-full rounded-xl border px-6 py-6">
              <div className=" w-full flex items-center  pb-3">
                <p className="text-zinc-600 text-sm font-medium ">
                  #801254 -{" "}
                  <span className="text-black tracking-tight">
                    {curr.commit_message}
                  </span>
                </p>
                <div className="flex items-center justify-between px-2 py-1 ml-2 bg-blue-50  rounded-lg border-[1.5px] border-blue-200">
                  <ClockIcon className="size-4 text-blue-600" />
                  <p className="text-xs ml-1 font-normal">
                    Commit on{" "}
                    {moment(curr.scheduled_time).format("MMMM Do, YYYY h:mm A")}
                  </p>
                </div>
              </div>

              <div className=" w-full flex items-center gap-3 mt-3  border-b pb-4">
                <div className="flex items-center gap-1 cursor-pointer ">
                  <GitHubLogoIcon className="size-4" />
                  <p className="text-xs tracking-tight font-medium px-1 py-1 text-gray-600 hover:text-purple-800 rounded-sm">
                    github/voiiddxx/FacebookScrapper
                  </p>
                </div>
                <div className="flex items-center  cursor-pointer ">
                  <GitBranch className="size-3.5 text-gray-600" />
                  <p className="text-xs tracking-tight px-1 py-1  font-medium text-gray-600">
                    Sandbox
                  </p>
                </div>
                <div className="flex items-center bg-purple-50 border rounded-md px-2   cursor-pointer gap-1">
                  <FolderIcon className="size-3.5 text-purple-600" />
                  <p className="text-xs tracking-tight px-1 py-1  font-medium text-purple-600">
                    5 File changes
                  </p>
                </div>
                <div className="flex items-center bg-white  rounded-md px-2   cursor-pointer gap-1">
                  <div className="h-5 w-5 rounded-md flex items-center justify-center">
                    <SlackSVGIcon />
                  </div>
                  <p className="text-xs tracking-tight px-1 py-1 text-gray-500  font-medium ">
                    Slack Enabled
                  </p>
                </div>
                <div className="flex items-center bg-white  rounded-md px-2   cursor-pointer gap-1">
                  <div className="h-5 w-5 rounded-md flex items-center justify-center">
                    <RocketLaunchIcon className="size-4 text-gray-500" />
                  </div>
                  <p className="text-xs tracking-tight text-gray-500  font-medium ">
                    Force Push
                  </p>
                </div>
              </div>

              <div className=" w-full flex items-center mt-3 justify-between">
                <div className="flex items-center">
                  <div className="h-6 w-6 rounded-full">
                    <Image
                      src={user.github_avatar_url}
                      className="rounded-full"
                      height={1500}
                      width={1500}
                      alt="user image"
                    />
                  </div>
                  <p className="text-xs font-Poppins tracking-tight font-medium ml-2">
                    Synced on <span className="text-purple-600">floww</span> by
                    voiiddxx
                  </p>
                  <p className="text-xs ml-1 tracking-tight text-gray-600">
                    updated {moment(curr.createdAt).fromNow()}{" "}
                  </p>
                </div>

                <div className="flex">
                  <DotsHorizontalIcon />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScheduledCommit;

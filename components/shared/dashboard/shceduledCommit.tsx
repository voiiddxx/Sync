"use client";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { GitBranch, GitCommit } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const ScheduledCommit = () => {
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
    <div className="w-full h-full px-4">
      <p className="text-sm text-gray-500">Sheduled Requests</p>

      <div className=" flex  flex-col mt-4 shadow-sm">
        {shceduledData.map((curr: any, index: Number) => {
          return (
            <div className="h-20  flex px-4 items-center first:rounded-t-md last:rounded-b-md justify-between  w-full border-b border-r border-l border-gray-200    first:border-t">
              <div className="flex gap-1 items-center">
                <div>
                  <p className="text-sm font-medium  text-gray-900">
                    {curr.commitid}
                  </p>
                  <div className=" flex items-center gap-1">
                    <DotFilledIcon className="size-5 text-orange-500 -ml-2 -mr-2" />
                    <p className="text-xs ml-1 text-gray-500 font-Poppins">
                      Synced
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className=" flex items-center gap-2 text-zinc-700">
                  <GitBranch size={15} />
                  <p className="text-[13.5px] font-Poppins">{curr.branch}</p>
                </div>
                <div className=" flex items-center gap-2">
                  <GitCommit size={17} className="-ml-1" />
                  <p className="text-[12.5px] font-Poppins">{curr.message}</p>
                </div>
              </div>

              <div className=" flex items-center gap-2">
                <p className="text-xs font-Poppins">2 hour ago by voiiddxx</p>
                <div className="h-6 w-6 rounded-full flex items-center justify-center bg-zinc-200">
                  <Image
                    src={`${user.github_avatar_url}`}
                    className="rounded-full"
                    height={1500}
                    width={1500}
                    alt="logo"
                  />
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

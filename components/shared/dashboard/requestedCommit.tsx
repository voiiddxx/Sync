import { CodeBracketIcon, HashtagIcon } from "@heroicons/react/24/solid";
import {
  DotsHorizontalIcon,
  DotsVerticalIcon,
  GitHubLogoIcon,
} from "@radix-ui/react-icons";
import {
  Dot,
  Equal,
  GitPullRequest,
  LucideGitCommitVertical,
} from "lucide-react";
import React from "react";

const RequestedCommits = () => {
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
  ];

  return (
    <div className="w-full h-full px-4 ">
      <p className="text-sm text-gray-500">Sheduled Requests</p>

      {/* all requested commit will be here */}
      <div className=" w-full h-full flex gap-2  flex-wrap mt-2 border rounded-md py-3 px-2">
        <div className="w-full flex justify-between items-center px-2">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 border rounded-full bg-gray-50 border-gray-200 flex items-center justify-center">
              <HashtagIcon className="size-3 text-black" />
            </div>
            <p className="text-[12px] font-Poppins text-gray-600">
              Commits Synced on 4 days ago
            </p>
          </div>

          <div className="h-6 w-6  shadow-sm cursor-pointer border mr-1 rounded-sm flex items-center justify-center ">
            <DotsHorizontalIcon className="text-black" strokeWidth={1.25} />
          </div>
        </div>
        <div className="w-full "></div>
        {shceduledData.map((curr: any, index: number) => {
          return (
            <div className="min-h-40 px-2 py-2 w-[49vh] bg-zinc-50 flex justify-between  rounded-md border border-zinc-300">
              <div className="  ml-2 mt-1 h-full flex flex-col justify-between">
                <div>
                  {" "}
                  <p className="text-sm font-Poppins text-gray-900 tracking-tight ">
                    {curr.repo}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <GitPullRequest className="text-gray-600 size-3" />
                    <p className="text-xs font-Poppins text-gray-600  tracking-tight ">
                      {curr.message}
                    </p>
                  </div>
                  <div className="mt-2">
                    <div className=" flex items-center gap-1 bg-white py-1 px-2 rounded-xl border">
                      <GitHubLogoIcon />
                      <p className="text-xs font-Poppins tracking-tighter">
                        github.com/voiiddxx/facebookscrapper
                      </p>
                    </div>
                  </div>
                </div>
                <div className=" flex items-center gap-1 mb-1">
                  <div className="px-2 py-1 border bg-white rounded-md">
                    <p className="text-[10px]  font-Poppins text-blue-500">
                      Schedule
                    </p>
                  </div>
                  <div className="px-2 py-1 border bg-white rounded-md">
                    <p className="text-[10px]  font-Poppins text-red-400">
                      Remove
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-full flex flex-col items-end justify-between">
                <div className="bg-white border flex items-center  h-6 w-[70px] rounded-md justify-center gap-1">
                  <div className="h-1.5 mr-1 w-1.5 ml-1 bg-green-600 rounded-full"></div>
                  <p className="text-[10px] font-Poppins">4:50 pm</p>
                </div>

                <div className="mr-2">
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

export default RequestedCommits;

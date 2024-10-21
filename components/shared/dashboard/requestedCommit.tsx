import {
  AdjustmentsHorizontalIcon,
  BoltIcon,
  CalendarDateRangeIcon,
  DocumentDuplicateIcon,
  HashtagIcon,
  PencilIcon,
  PlusCircleIcon,
  QueueListIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/solid";
import { DotsHorizontalIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { GitBranch, GitCommit, GitPullRequest } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

import CustomModal from "../modal";
import { SlackSVGIcon } from "./sideBar";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ScheduleModalContent from "./schedule-modal";

const RequestedCommits = ({ data }: any) => {
  const user = useSelector((state: any) => state.user.value);

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
        {data.map((curr: any, index: number) => {
          return (
            <div className="min-h-40 px-2 py-2 w-[49vh] bg-zinc-50 flex justify-between  rounded-md border border-zinc-300 overflow-hidden relative">
              <div className="  ml-2 mt-1 h-full flex flex-col justify-between">
                <div>
                  {" "}
                  <p className="text-sm font-Poppins text-gray-900 tracking-tight ">
                    {curr.repo}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <GitPullRequest className="text-gray-600 size-3" />
                    <p className="text-xs font-Poppins text-gray-600  tracking-tight ">
                      {curr.commit_message || "No Message"}
                    </p>
                  </div>
                  <div className="mt-2">
                    <div className=" flex items-center gap-1 bg-white py-1 px-2 rounded-xl border">
                      <GitHubLogoIcon />
                      <p className="text-xs font-Poppins tracking-tighter">
                        github.com/{user.username}/{curr?.repo}
                      </p>
                    </div>
                  </div>
                </div>
                <div className=" flex items-center gap-1 mb-1">
                  <CustomModal
                    prevItem={
                      <div className="px-2 py-1 border bg-white rounded-md">
                        <p className="text-[10px]  font-Poppins text-blue-500">
                          Schedule
                        </p>
                      </div>
                    }
                    modalContent={<ScheduleModalContent />}
                  />
                  <div className="px-2 py-1 border bg-white rounded-md">
                    <p className="text-[10px]  font-Poppins text-red-400">
                      Remove
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-full flex flex-col mr-1 items-end justify-between">
                <div className="bg-white border flex items-center  h-6  w-[100px] rounded-md justify-center gap-1">
                  <div className="h-1.5 mr-1 w-1.5 ml-1 bg-green-600 rounded-full"></div>
                  <p className="text-[10px] font-Poppins mr-1 line-clamp-1">
                    {moment(curr.createdAt).startOf("hour").fromNow()}
                  </p>
                </div>

                <div className="mr-2">
                  <Popover>
                    <PopoverTrigger>
                      <DotsHorizontalIcon />
                    </PopoverTrigger>
                    <PopoverContent className="w-52">
                      <div className=" flex flex-col w-full h-full">
                        <div className=" h-10 bg-zinc-50 w-full flex items-center justify-start border-b ">
                          <AdjustmentsHorizontalIcon className="size-4 ml-2" />
                          <p className="text-sm font-Poppins px-2">Manage</p>
                        </div>

                        <div className="pt-2 flex flex-col gap-2 mt-2 pb-3 text-gray-950">
                          <div className=" w-full items-center flex gap-2 hover:bg-zinc-50 py-2 px-2 cursor-pointer hover:rounded-md">
                            <QueueListIcon className="size-5" />
                            <p className="text-[13px] font-Poppins ">
                              Overiview
                            </p>
                          </div>
                          <div className=" w-full items-center flex gap-2 hover:bg-zinc-50 py-2 px-2 cursor-pointer hover:rounded-md">
                            <PencilIcon className="size-4" />
                            <p className="text-[13px] font-Poppins ">
                              Edit commit
                            </p>
                          </div>
                          <div className=" w-full items-center flex gap-2 hover:bg-zinc-50 py-2 px-2 cursor-pointer hover:rounded-md">
                            <DocumentDuplicateIcon className="size-4" />
                            <p className="text-[13px] font-Poppins ">
                              2 file changes
                            </p>
                          </div>
                          <div className=" w-full items-center flex gap-2 hover:bg-zinc-50 py-2 px-2 cursor-pointer hover:rounded-md">
                            <PlusCircleIcon className="size-4" />
                            <p className="text-[13px] font-Poppins ">
                              Add message
                            </p>
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
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


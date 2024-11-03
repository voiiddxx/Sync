"use client";
import {
  CalendarDateRangeIcon,
  ClockIcon,
  DocumentArrowDownIcon,
  FireIcon,
  FolderIcon,
  RectangleStackIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/solid";
import { DotsHorizontalIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { ChevronDown, ChevronRight, FileText, GitBranch, Loader, Trash2 } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SlackSVGIcon } from "./sideBar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import CustomModal from "../modal";
import EditScheduleModal from "../commits/editSchedulemodal";
import DeleteModalComponent from "../commits/delete-modal";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const ScheduledCommit = ({ data }: any) => {



  const user = useSelector((state: any) => state.user.value);

  const [isLoading, setisLoading] = useState<boolean>(false);

  const postCommit = async (commitId: any) => {
    setisLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/commit/push`,
        {
          username: user?.username,
          commitId: commitId,
        }
      );
      if (res.status !== 200) {
        setisLoading(false);
        console.log("Some error occured");
        return;
      }
      setisLoading(false);
      console.log("Commit scheduled successfully", res.data);
    } catch (error) {
      setisLoading(false);
      console.log(error);
    }
  };

  if (data?.length < 1) {
    return (
      <div className=" h-full w-full flex items-center justify-center overflow-hidden">
        <div className="relative">
          <div className=" h-[350px] w-[450px] flex items-center  justify-center">
            <Image
              className="h-full w-full object-cover  animate-stretch "
              src={`/nodata.png`}
              height={1500}
              width={1500}
              alt="image"
            />
          </div>
          <div className=" w-full flex flex-col items-center justify-center">
            <p className=" text-[15px] font-Poppins text-center font-semibold">
              Requested commit will show here!
            </p>
            <p className="text-[12px] text-center mt-2 font-medium text-zinc-700 font-Poppins">
              Hold tight! , we are looking for your requests, <br /> please
              check back in few minutes.
            </p>

            <div className=" w-full flex items-center justify-center gap-2 mt-4">
              <div className=" px-2 py-2 border border-zinc-400 rounded-md flex items-center justify-center gap-1">
                <Loader size={15} />
                <p className="text-xs font-Poppins font-medium">Refresh now </p>
              </div>
              <div className=" px-2 py-2 shadow-md bg-gradient-to-b from-zinc-950 via-zinc-800 to-zinc-700 rounded-md flex items-center justify-center gap-1">
                <FireIcon className="size-4 text-white" />
                <p className="text-xs text-white font-Poppins font-medium">
                  Create commit{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[76vh] overflow-hidden  px-4 font-Poppins">
      <p className="text-sm text-gray-500">Sheduled Requests</p>
      <div
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
        className=" flex pb-20  flex-col mt-4 h-[70vh] overflow-scroll rounded-md gap-2 "
      >
        {data?.map((curr: any, index: Number) => {
          return (
            <div className="min-h-40  pb-3 w-full rounded-xl border bg-[#191919] px-6 py-6 ">
              <div className=" w-full flex items-center  pb-3">
                <p className="text-zinc-400 text-sm font-normal ">
                  #801254 -{" "}
                  <span className="text-white tracking-tight">
                    {curr.commit_message}
                  </span>
                </p>
                <div className="flex items-center justify-between px-2 py-1 ml-2 bg-gradient-to-r from-[#262626] to-[#131313]   rounded-lg border-[1.5px] border-zinc-700">
                  <ClockIcon className="size-4 text-[#522fff]" />
                  <p className="text-xs ml-1 font-normal text-white/60">
                    Commit on{" "}
                    {moment(curr.scheduled_time).format("MMMM Do, YYYY h:mm A")}
                  </p>
                </div>
              </div>


              <div className=" w-full border-b pb-3" >
              <p className="text-xs text-white/20" >Update the ui for the scheduling commit page and evolve the new uio desgin with figma</p>
              </div>

              <div className=" w-full flex items-center gap-3 mt-3  border-b pb-4">
                <div className="flex items-center gap-1 cursor-pointer ">
                  <GitHubLogoIcon className="size-4 text-zinc-300" />
                  <p className="text-xs tracking-tight font-medium px-1 py-1 text-white/70 hover:text-purple-800 rounded-sm">
                    github/voiiddxx/{curr.repo}
                  </p>
                </div>
                <div className="flex items-center  cursor-pointer ">
                  <GitBranch className="size-3.5 text-red-400" />
                  <p className="text-xs tracking-tight px-1 py-1  font-medium text-red-400">
                    {curr?.branch}
                  </p>
                </div>
                <div className="flex items-center  border rounded-md px-2   cursor-pointer gap-1">
                  <FolderIcon className="size-3.5 text-purple-400" />
                  <p className="text-xs tracking-tight px-1 py-1  font-medium text-purple-400">
                    {curr?.files?.length} File changes
                  </p>
                </div>
                <div className="flex items-center bg-[#262626]  rounded-md px-2   cursor-pointer gap-1">
                  <div className="h-5 w-5 rounded-md flex items-center justify-center">
                    <SlackSVGIcon />
                  </div>
                  <p className="text-xs tracking-tight px-1 py-1 text-gray-300  font-medium ">
                    Slack <span>{curr.isSlack ? "Enabled" : "Disabled"}</span>
                  </p>
                </div>
                <div className="flex items-center bg-[#ff5e07] bg-opacity-5  rounded-md px-2   cursor-pointer gap-1">
                  <div className="h-5 w-5 rounded-md flex items-center justify-center">
                    <RocketLaunchIcon className="size-4 text-[#ff8341]" />
                  </div>
                  <p className="text-xs tracking-tight text-[#f67733]  font-medium ">
                    Force Push{" "}
                    <span>{curr.isForce ? "Enabled" : "Disabled"}</span>
                  </p>
                </div>
              </div>



              <div className="border-b pb-3 w-full flex items-start mt-4 gap-8" >
              <Collapsible>
                <CollapsibleTrigger className="flex items-center text-[11px] font-semibold text-zinc-500">
                  <ChevronDown className="w-3 h-3 mr-1" />
                  Newly created files
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 space-y-2">
                  {curr?.additionFile &&
                    curr?.additionFile.map((curr: any, index: any) => {
                      return (
                        <div
                          onClick={() => {
                            // setcurrentDiffFile(curr);
                          }}
                          className="text-[11px] pl-4 flex gap-1 items-center text-white/60"
                        >
                          <FileText className="size-3 text-blue-400" />
                          {curr.path}
                        </div>
                      );
                    })}
                </CollapsibleContent>
              </Collapsible>
              <Collapsible>
                <CollapsibleTrigger className="flex items-center text-[11px] font-semibold text-zinc-500">
                  <ChevronDown className="w-3 h-3 mr-1" />
                  Modiflied Files
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 space-y-2">
                  {curr?.additionFile &&
                    curr?.additionFile.map((curr: any, index: any) => {
                      return (
                        <div
                          onClick={() => {
                            // setcurrentDiffFile(curr);
                          }}
                          className="text-[11px] pl-4 flex gap-1 items-center text-white/60"
                        >
                          <FileText className="size-3 text-blue-400" />
                          {curr.path}
                        </div>
                      );
                    })}
                </CollapsibleContent>
              </Collapsible>
              <Collapsible>
                <CollapsibleTrigger className="flex items-center text-[11px] font-semibold text-zinc-500">
                  <ChevronDown className="w-3 h-3 mr-1" />
                  Deleted Files
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 space-y-2">
                  {curr?.additionFile &&
                    curr?.additionFile.map((curr: any, index: any) => {
                      return (
                        <div
                          onClick={() => {
                            // setcurrentDiffFile(curr);
                          }}
                          className="text-[11px] pl-4 flex gap-1 items-center text-white/60"
                        >
                          <FileText className="size-3 text-blue-400" />
                          {curr.path}
                        </div>
                      );
                    })}
                </CollapsibleContent>
              </Collapsible>
              <Collapsible>
                <CollapsibleTrigger className="flex items-center text-[11px] font-semibold text-zinc-500">
                  <ChevronDown className="w-3 h-3 mr-1" />
                  Renamed Files
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 space-y-2">
                  {curr?.additionFile &&
                    curr?.additionFile.map((curr: any, index: any) => {
                      return (
                        <div
                          onClick={() => {
                            // setcurrentDiffFile(curr);
                          }}
                          className="text-[11px] pl-4 flex gap-1 items-center text-white/60"
                        >
                          <FileText className="size-3 text-blue-400" />
                          {curr.path}
                        </div>
                      );
                    })}
                </CollapsibleContent>
              </Collapsible>
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
                  <p className="text-xs font-Poppins text-gray-400 tracking-tight font-medium ml-2">
                    Synced on <span className="text-purple-400">floww</span> by
                    voiiddxx
                  </p>
                  <p className="text-xs ml-1 tracking-tight text-gray-600">
                    updated {moment(curr.createdAt).fromNow()}{" "}
                  </p>
                </div>

                <div className="flex">
                  <Popover>
                    <PopoverTrigger>
                      <div>
                        <DotsHorizontalIcon className="text-white/50" />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="flex  flex-col   w-60 ">
                      <div className=" flex flex-col  ">
                        <CustomModal
                          width={"500px"}
                          prevItem={
                            <div
                              key={""}
                              className="h-12 w-full hover:bg-zinc-100   transition-all duration-200 ease-in-out flex items-center justify-between  font-Poppins hover:bg-zinc-50w-full cursor-pointer"
                            >
                              <div className=" flex items-center gap-2">
                                <div className="flex items-center gap-1 text-gray-700">
                                  {/* {item.icon} */}
                                  <Trash2 className="size-4 text-red-500" />
                                </div>
                                <p className="text-xs font-Poppins font-medium tracking-tight  text-red-500">
                                  Delete commit
                                </p>
                              </div>
                              <div>
                                <ChevronRight className="size-3 text-white/40" />
                              </div>
                            </div>
                          }
                          modalContent={(closeModal: any) => (
                            <DeleteModalComponent
                              data={curr}
                              closeModal={closeModal}
                            />
                          )}
                        />
                        <CustomModal
                          prevItem={
                            <div
                              key={""}
                              className="h-12 w-full hover:bg-zinc-100   transition-all duration-200 ease-in-out flex items-center justify-between  font-Poppins hover:bg-zinc-50w-full cursor-pointer"
                            >
                              <div className=" flex items-center gap-2">
                                <div className="flex items-center gap-1 text-gray-700">
                                  {/* {item.icon} */}
                                  <GitHubLogoIcon className="size-4 text-white/80" />
                                </div>
                                <p className="text-xs font-Poppins font-medium tracking-tight  text-zinc-400">
                                  Reschedule commit
                                </p>
                              </div>
                              <div>
                                <ChevronRight className="size-3 text-white/40" />
                              </div>
                            </div>
                          }
                          modalContent={(closeModal: any) => (
                            <EditScheduleModal
                              data={curr}
                              closeModal={closeModal}
                            />
                          )}
                        />
                      </div>
                      <div className="">
                        <div
                          className="h-8 w-full flex items-center justify-center bg-gradient-to-b from-[#262626] to-[#272727] border border-zinc-700  rounded-md mt-3 cursor-pointer"
                          onClick={() => {
                            postCommit(curr.id);
                          }}
                        >
                          <p
                            className={`text-xs font-Poppins  text-white transition-opacity duration-500 ${
                              isLoading ? "opacity-0" : "opacity-100"
                            }`}
                          >
                            Push anyway
                          </p>
                          <Loader
                            className={`absolute animate-spin text-white w-5 h-5 transition-opacity duration-1000 ${
                              isLoading ? "opacity-100 " : "opacity-0"
                            }`}
                          />
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

export default ScheduledCommit;

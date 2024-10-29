"use client";
import {
  CalendarDateRangeIcon,
  ClockIcon,
  FireIcon,
  FolderIcon,
  PencilSquareIcon,
  RectangleStackIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/solid";
import { DotsHorizontalIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import {
  ChevronRight,
  Clock1,
  FileChartColumn,
  GitBranch,
  GitCommit,
  Loader,
} from "lucide-react";
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

const ScheduledCommit = ({ data }: any) => {
  const dataforpopOver = [
    {
      label: "Edit commit",
      icon: <GitHubLogoIcon className="size-4" />,
    },
    {
      label: "Reschedule commit",
      icon: <CalendarDateRangeIcon className="size-4" />,
    },
  ];

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
            <div className="min-h-40 pb-3 w-full rounded-xl border px-6 py-6 ">
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
                    github/voiiddxx/{curr.repo}
                  </p>
                </div>
                <div className="flex items-center  cursor-pointer ">
                  <GitBranch className="size-3.5 text-gray-600" />
                  <p className="text-xs tracking-tight px-1 py-1  font-medium text-gray-600">
                    {curr?.branch}
                  </p>
                </div>
                <div className="flex items-center bg-purple-50 border rounded-md px-2   cursor-pointer gap-1">
                  <FolderIcon className="size-3.5 text-purple-600" />
                  <p className="text-xs tracking-tight px-1 py-1  font-medium text-purple-600">
                    {curr?.files?.length} File changes
                  </p>
                </div>
                <div className="flex items-center bg-white  rounded-md px-2   cursor-pointer gap-1">
                  <div className="h-5 w-5 rounded-md flex items-center justify-center">
                    <SlackSVGIcon />
                  </div>
                  <p className="text-xs tracking-tight px-1 py-1 text-gray-600  font-medium ">
                    Slack <span>{curr.isSlack ? "Enabled" : "Disabled"}</span>
                  </p>
                </div>
                <div className="flex items-center bg-white  rounded-md px-2   cursor-pointer gap-1">
                  <div className="h-5 w-5 rounded-md flex items-center justify-center">
                    <RocketLaunchIcon className="size-4 text-gray-600" />
                  </div>
                  <p className="text-xs tracking-tight text-gray-600  font-medium ">
                    Force Push{" "}
                    <span>{curr.isForce ? "Enabled" : "Disabled"}</span>
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
                  <Popover>
                    <PopoverTrigger>
                      <div>
                        <DotsHorizontalIcon />
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="flex  flex-col   w-60  ">
                      <div className=" h-12 flex items-center pl-4 gap-2 justify-start px-2 w-full bg-zinc-50 border-b rounded-t-xl">
                        <RectangleStackIcon className="size-5 text-gray-800" />
                        <p className="text-sm font-medium">Manage</p>
                      </div>
                      <div className=" flex flex-col  ">
                        <CustomModal
                          prevItem={
                            <div
                              key={""}
                              className="h-12 w-full hover:bg-zinc-100  px-3 transition-all duration-200 ease-in-out flex items-center justify-between  font-Poppins hover:bg-zinc-50w-full cursor-pointer"
                            >
                              <div className=" flex items-center gap-2">
                                <div className="flex items-center gap-1 text-gray-700">
                                  {/* {item.icon} */}
                                  <GitHubLogoIcon className="size-4" />
                                </div>
                                <p className="text-xs font-Poppins font-medium tracking-tight  text-zinc-800">
                                  Edit commit
                                </p>
                              </div>
                              <div>
                                <ChevronRight className="size-3" />
                              </div>
                            </div>
                          }
                          modalContent={(closeModal: any) => (
                            <EditScheduleModal
                              data={data}
                              closeModal={closeModal}
                            />
                          )}
                        />
                        <CustomModal
                          prevItem={
                            <div
                              key={""}
                              className="h-12 w-full hover:bg-zinc-100  px-3 transition-all duration-200 ease-in-out flex items-center justify-between  font-Poppins hover:bg-zinc-50w-full cursor-pointer"
                            >
                              <div className=" flex items-center gap-2">
                                <div className="flex items-center gap-1 text-gray-700">
                                  {/* {item.icon} */}
                                  <GitHubLogoIcon className="size-4" />
                                </div>
                                <p className="text-xs font-Poppins font-medium tracking-tight  text-zinc-800">
                                  Reschedule commit
                                </p>
                              </div>
                              <div>
                                <ChevronRight className="size-3" />
                              </div>
                            </div>
                          }
                          modalContent={(closeModal: any) => (
                            <EditScheduleModal
                              data={data}
                              closeModal={closeModal}
                            />
                          )}
                        />
                      </div>
                      <div className=" pb-2 px-2">
                        <div
                          className="h-8 w-full flex items-center justify-center bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-700  rounded-lg mt-3 cursor-pointer"
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

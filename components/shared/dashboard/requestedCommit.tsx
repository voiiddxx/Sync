import {
  AdjustmentsHorizontalIcon,
  CalendarDateRangeIcon,
  DocumentDuplicateIcon,
  FireIcon,
  HashtagIcon,
  PencilIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  QueueListIcon,
} from "@heroicons/react/24/solid";
import { DotsHorizontalIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { ChevronRight, GitPullRequest, Loader } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";

import CustomModal from "../modal";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ScheduleModalContent from "./schedule-modal";
import Image from "next/image";
import EditCommit from "../modals/editCommit";

const RequestedCommits = ({ data }: any) => {
  const user = useSelector((state: any) => state.user.value);

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
        {data?.map((curr: any, index: number) => {
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
                    <PopoverContent className="w-60">
                      <div className=" flex flex-col w-full h-full">
                        <div className=" h-10 rounded-t-xl px-4 bg-zinc-50 w-full flex items-center justify-start border-b ">
                          <AdjustmentsHorizontalIcon className="size-4" />
                          <p className="text-sm font-Poppins px-2">Manage</p>
                        </div>

                        <div className="pt-2 flex flex-col gap-2 mt-2 pb-3 text-gray-950 px-2">
                          
                          <CustomModal
                            prevItem={
                             <div className=" w-full transition-all duration-300 ease-in-out flex justify-between items-center hover:bg-purple-100 rounded-lg px-2 text-gray-700  hover:text-purple-700 " > <div className="w-full  flex items-center gap-2  py-2  cursor-pointer hover:rounded-md">
                             <CalendarDateRangeIcon className="size-5 " />
                             <p className="text-[13px] font-Poppins tracking-tight">
                               Schedule Commit
                             </p>
                           </div>
                           <ChevronRight size={20} strokeWidth={1.5}/>
                           </div>
                            }
                            modalContent={(closeModal: any) => (
                              <EditCommit data={curr} closeModal={closeModal} />
                            )}
                          />

                          <CustomModal
                            prevItem={
                              <div className=" w-full flex items-center text-gray-700 hover:text-purple-700 justify-between px-2 hover:bg-purple-100 rounded-lg transition-all duration-300 ease-in-out" ><div className=" w-full items flex items-center gap-2  py-2  cursor-pointer hover:rounded-md">
                              <PencilSquareIcon className="size-5 " />
                              <p className="text-[13px] font-Poppins ">
                                Update commit
                              </p>
                            </div>
                            <ChevronRight size={20} strokeWidth={1.5} className="text-gray-700" /></div>
                            }
                            modalContent={(closeModal: any) => (
                              <ScheduleModalContent
                                data={curr}
                                closeModal={closeModal}
                              />
                            )}
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

export default RequestedCommits;

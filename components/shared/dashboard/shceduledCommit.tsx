"use client";
import {
  CalendarDateRangeIcon,
  ClockIcon,
  FireIcon,
  FolderIcon,
  RectangleStackIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/solid";
import { DotsHorizontalIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import {
  ChevronRight,
  GitBranch,
  Loader,
  Trash2,
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
import DeleteModalComponent from "../commits/delete-modal";

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

 
};

export default ScheduledCommit;






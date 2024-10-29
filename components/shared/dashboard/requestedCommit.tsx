import { FireIcon, HashtagIcon } from "@heroicons/react/24/solid";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Loader } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import Image from "next/image";

import CommitCard from "../commits/commit-card";

const RequestedCommits = ({ data }: any) => {
  
  const user = useSelector((state: any) => state.user.value);

  if (data?.length < 1) {
    return (
      <div className=" h-[75vh] w-full flex items-center justify-center overflow-hidden">
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
    <div className="w-full h-[75vh] overflow-hidden px-4 ">
      <p className="text-sm font-Poppins text-gray-500">Requested Requests</p>

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
        <div style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
        }} className="w-full h-[63vh] flex flex-wrap flex-row gap-4 mt-4 overflow-scroll pb-20">
        {data?.map((curr: any, index: number) => {
          return <CommitCard data={curr} user={user} />;
        })}
        </div>
      </div>
    </div>
  );
};

export default RequestedCommits;

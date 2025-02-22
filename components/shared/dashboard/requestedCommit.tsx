import { FireIcon, HashtagIcon } from "@heroicons/react/24/solid";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Loader } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import Image from "next/image";

import CommitCard from "../commits/commit-card";
import CommitPannel from "../commits/commitPannel";


const RequestedCommits = ({ data }: any) => {
  

  const user = useSelector((state: any) => state.user.value);



  if (!data || data?.length < 1) {
    return (
      <div className=" h-full w-full flex items-center justify-center overflow-hidden">
        <div className="relative">
          <div className=" h-[450px] w-[450px] flex items-center  justify-center">
            <Image
              className="h-full w-full object-cover  animate-stretch "
              src={`/nodata.png`}
              height={3000}
              width={3000}
              alt="image"
            />
          </div>
          <div className=" w-full flex flex-col items-center justify-center -mt-12">
            <p className=" text-[15px] font-Poppins text-white/70 text-center font-semibold">
              Requested commit will show here!
            </p>
            <p className="text-[12px] text-center mt-2 font-medium text-white/30 font-Poppins">
              Hold tight! , we are looking for your requests, <br /> please
              check back in few minutes.
            </p>

            <div className=" w-full flex items-center justify-center gap-2 mt-4">
              <div className=" px-4 py-2 border border-zinc-400 rounded-md flex items-center justify-center gap-1">
                
                <p className="text-xs font-Poppins font-medium text-white/50">Refresh now </p>
              </div>
              <div className=" px-2 py-2 shadow-md bg-[#3f3f3f] rounded-md flex items-center justify-center gap-1">
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
    <div>
      {
      data?.length > 0 && data[0] && (
        <CommitPannel data={data[0]} user={user}/>
      )
    }
    </div>
  )

  
};

export default RequestedCommits;



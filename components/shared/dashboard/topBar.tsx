"use client";

import { updateSidebar } from "@/store/slices/windowSlice";
import { InboxArrowDownIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { Dot, PanelLeft, PlusCircle } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const TopBar = () => {
  const user = useSelector((state: any) => state.user.value);
  const window = useSelector((state: any) => state.window.value);
  const diapatch = useDispatch();

  console.log(window);
  

  return (
    <div className=" w-full h-full flex items-center px-4 justify-between">
      <div className=" flex items-center gap-2 px-2">
        <PanelLeft onClick={()=>{
          diapatch(updateSidebar(!window));
        }} size={20} className="text-zinc-700 mr-4"/>
        <div className="h-8 w-8 rounded-full bg-slate-300 ">
          <Image
            className="rounded-full"
            src={user?.github_avatar_url}
            height={1500}
            width={1500}
            alt="user avatar"
          />
        </div>
        <p className="text-[15px] font-normal">{user?.username}'s</p>
        <p className=" text-sm bg-zinc-100 px-2 py-1 rounded-md font-medium text-gray-700">
          codespace
        </p>
      </div>

      <div className="flex  gap-3 items-center">
        <div className=" h-10 w-10 rounded-md border flex items-center shadow-sm justify-center">
          <InboxArrowDownIcon className="size-5 text-zinc-800" />
        </div>

        <div className="flex px-4 items-center justify-center gap-2 h-10  border rounded-lg shadow-sm bg-white">
          <PlusCircle className="text-zinc-800" size={18} />
          <p className="text-zinc-800 text-sm leading-loose tracking-wide ">
            Schedule{" "}
          </p>
        </div>

        <div className=" flex flex-col items-center mt-4 justify-center">
          <div className="h-8 w-8 rounded-full bg-slate-300 shadow-md ">
            <Image
              className="rounded-full"
              src={user?.github_avatar_url}
              height={1500}
              width={1500}
              alt="user avatar"
            />
          </div>
          <Dot size={25} className="-mt-2 text-indigo-500" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;

"use client";

import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { updateSidebar } from "@/store/slices/windowSlice";
import { BellAlertIcon, InboxArrowDownIcon, PlusCircleIcon, QrCodeIcon } from "@heroicons/react/24/solid";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Dot, GitBranch, Github, PanelLeft, PlusCircle, Rabbit } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SlackSVGIcon } from "./sideBar";
import DynamicIsland from "@/modules/dynamicIsland";

const TopBar = () => {
  const user = useSelector((state: any) => state.user.value);
  const window = useSelector((state: any) => state.window.value);
  const diapatch = useDispatch();
  const { toast } = useToast();


  const [showDynamic, setshowDynamic] = useState<number>(0);
  const [isAnimating, setisAnimating] = useState<boolean>(false)

  return (
    <div className=" w-full h-full flex items-center px-4 justify-between">
      <div className=" flex items-center  gap-2 px-2">
        <div onClick={() => {
              diapatch(updateSidebar(!window));
            }} className="px-2 py-2 transition-all duration-200 dark:hover:bg-white/10  cursor-pointer hover:bg-zinc-100 flex items-center rounded-lg justify-center">
          <PanelLeft
            size={20}
            className="text-zinc-700 dark:text-white/70 "
          />
        </div>
        <div className="h-8 w-8 rounded-full bg-slate-300 ">
          <Image
            className="rounded-full"
            src={user?.github_avatar_url}
            height={1500}
            width={1500}
            alt="user avatar"
          />
        </div>
        <p className="text-[15px] font-normal dark:text-white/70">{user?.username}'s</p>
        <p className=" text-sm bg-[#414141] px-2 py-1 rounded-md font-medium text-white/70">
          codespace
        </p>
      </div>

      {/* dynamic island section  */}

      <div
    onClick={() => {
      setshowDynamic(showDynamic === 0 ? 1 : showDynamic === 1 ? 2 : 0);
      setisAnimating(true)
      setTimeout(() => {
          setisAnimating(false);
      }, 300);
    }}
    className={` h-10 transition-all shadow-sm ease-in-out duration-500 ${
      showDynamic === 0 ? "w-36" : showDynamic === 1 ? "w-40 " : "w-[450px]"
    } cursor-pointer bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-700 rounded-full  ${isAnimating ? 'animate-stretch' : ''} `}
  >

      {
        showDynamic === 0 && (
          <div className="w-full h-full flex items-center justify-center" >
            {/* <Rabbit size={20} strokeWidth={1.25} className="text-black" /> */}
          </div>
        )
      }

    {showDynamic === 1 && (
      <div className={` w-full h-full  flex items-center justify-between px-4 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        <div>
          <QrCodeIcon  className={`text-white size-4 transition-all  ${isAnimating && 'animate-bounce duration-200'}`} />
        </div>
        <p className={`text-white text-xs font-Poppins `}>{user?.username || 'voiiddxx'}</p>
      </div>
    )}

    {showDynamic === 2 && (
      <div className=" w-full h-full px-4 flex  justify-between items-center">
        <div className={`flex items-center gap-2 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          <div className=" h-4 w-4 rounded-full bg-white">
            <Image
              className="rounded-full shadow-xl"
              src={`${user?.github_avatar_url || 'https://avatars.githubusercontent.com/u/95859137?v=4'}`}
              height={1500}
              width={1500}
              alt="image"
            />
          </div>
          <p className={`text-white text-xs font-Poppins transition-opacity duration-1000 ${showDynamic == 2 ? 'opacity-100' : 'opacity-10'} tracking-tight`} >voiiddxx/floww</p>
        </div>
        <div className={`flex items-center gap-2 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          <GitBranch className="text-white" size={15} strokeWidth={1.25} />
          <p className="text-white text-xs font-Poppins tracking-tight" >main</p>
        </div>
        <div className={`flex items-center gap-2 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          <BellAlertIcon className="text-white size-4"  />
          <p className="text-white text-xs font-Poppins tracking-tight" >2 New</p>
        </div>
        <div className={`flex items-center gap-2 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        <div className="h-7 w-7 shadow-md rounded-md flex items-center justify-center overflow-hidden p-1">
          <SlackSVGIcon />
        </div>
          <p className="text-white text-xs font-Poppins tracking-tight" >Connected</p>
        </div>
  
     
      </div>
    )}
  </div>
      <div className="flex  gap-3 items-center">
        <div className=" h-10 w-10 rounded-md border dark:border-white/10 flex items-center shadow-sm justify-center">
          <InboxArrowDownIcon className="size-5 text-zinc-800 dark:text-white/70" />
        </div>

        {/* <div className="flex px-2 items-center justify-center gap-2 h-10  border rounded-lg shadow-sm bg-white">
          <PlusCircle className="text-zinc-800" size={18} />
          <p className="text-zinc-800 text- font-Poppins leading-loose tracking-wide ">
            Schedule{" "}
          </p>
        </div> */}

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

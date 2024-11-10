"use client";

import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { updateSidebar } from "@/store/slices/windowSlice";
import {
  BellAlertIcon,
  CogIcon,
  DevicePhoneMobileIcon,
  InboxArrowDownIcon,
  PlusCircleIcon,
  QrCodeIcon,
} from "@heroicons/react/24/solid";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import {
  Check,
  Dot,
  GitBranch,
  Github,
  LogOut,
  LucideLogOut,
  PanelLeft,
  PlusCircle,
  Rabbit,
  Settings,
  Smartphone,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SlackSVGIcon } from "./sideBar";
import DynamicIsland from "@/modules/dynamicIsland";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const TopBar = () => {
  const user = useSelector((state: any) => state.user.value);
  const window = useSelector((state: any) => state.window.value);
  const diapatch = useDispatch();
  const { toast } = useToast();

  const [showDynamic, setshowDynamic] = useState<number>(0);
  const [isAnimating, setisAnimating] = useState<boolean>(false);


  const profilePopoverdata = [
    {
      title:'My Profile',
      link:'https://github.com/your-username',
      icon: <GitHubLogoIcon  className="h-5 w-5" />
    },
    {
      title:'Account Settings',
      link:'https://github.com/your-username',
      icon: <CogIcon  className="h-5 w-5" />
    },
    {
      title:'Device Managements',
      link:'https://github.com/your-username',
      icon: <DevicePhoneMobileIcon  className="h-5 w-5" />
    },
    {
      title:'Sign out',
      link:'https://github.com/your-username',
      icon: <LucideLogOut className="h-5 w-5" />
    },
  
  ]

  return (
    <div className=" w-full h-full flex items-center px-4 justify-between">
      <div className=" flex items-center  gap-2 px-2">
        <div
          onClick={() => {
            diapatch(updateSidebar(!window));
          }}
          className="px-2 py-2 transition-all duration-200 dark:hover:bg-white/10  cursor-pointer hover:bg-zinc-100 flex items-center rounded-lg justify-center"
        >
          <PanelLeft size={20} className="text-zinc-700 dark:text-white/70 " />
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
        <p className="text-[15px] font-normal dark:text-white/70">
          {user?.username}'s
        </p>
        <p className=" text-sm bg-[#414141] px-2 py-1 rounded-md font-medium text-white/70">
          codespace
        </p>
      </div>

      {/* dynamic island section  */}

      <div
        onClick={() => {
          setshowDynamic(showDynamic === 0 ? 1 : showDynamic === 1 ? 2 : 0);
          setisAnimating(true);
          setTimeout(() => {
            setisAnimating(false);
          }, 300);
        }}
        className={` h-10 transition-all shadow-sm ease-in-out duration-500 ${
          showDynamic === 0 ? "w-36" : showDynamic === 1 ? "w-40 " : "w-[450px]"
        } cursor-pointer bg-black border rounded-full  ${
          isAnimating ? "animate-stretch" : ""
        } `}
      >
        {showDynamic === 0 && (
          <div className="w-full h-full flex items-center justify-center">
            {/* <Rabbit size={20} strokeWidth={1.25} className="text-black" /> */}
          </div>
        )}

        {showDynamic === 1 && (
          <div
            className={` w-full h-full  flex items-center justify-between px-4 transition-opacity duration-300 ${
              isAnimating ? "opacity-0" : "opacity-100"
            }`}
          >
            <div>
              <QrCodeIcon
                className={`text-white size-4 transition-all  ${
                  isAnimating && "animate-bounce duration-200"
                }`}
              />
            </div>
            <p className={`text-white text-xs font-Poppins `}>
              {user?.username || "voiiddxx"}
            </p>
          </div>
        )}

        {showDynamic === 2 && (
          <div className=" w-full h-full px-4 flex  justify-between items-center">
            <div
              className={`flex items-center gap-2 transition-opacity duration-300 ${
                isAnimating ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className=" h-4 w-4 rounded-full bg-white">
                <Image
                  className="rounded-full shadow-xl"
                  src={`${
                    user?.github_avatar_url ||
                    "https://avatars.githubusercontent.com/u/95859137?v=4"
                  }`}
                  height={1500}
                  width={1500}
                  alt="image"
                />
              </div>
              <p
                className={`text-white text-xs font-Poppins transition-opacity duration-1000 ${
                  showDynamic == 2 ? "opacity-100" : "opacity-10"
                } tracking-tight`}
              >
                voiiddxx/floww
              </p>
            </div>
            <div
              className={`flex items-center gap-2 transition-opacity duration-300 ${
                isAnimating ? "opacity-0" : "opacity-100"
              }`}
            >
              <GitBranch className="text-white" size={15} strokeWidth={1.25} />
              <p className="text-white text-xs font-Poppins tracking-tight">
                main
              </p>
            </div>
            <div
              className={`flex items-center gap-2 transition-opacity duration-300 ${
                isAnimating ? "opacity-0" : "opacity-100"
              }`}
            >
              <BellAlertIcon className="text-white size-4" />
              <p className="text-white text-xs font-Poppins tracking-tight">
                2 New
              </p>
            </div>
            <div
              className={`flex items-center gap-2 transition-opacity duration-300 ${
                isAnimating ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="h-7 w-7 shadow-md rounded-md flex items-center justify-center overflow-hidden p-1">
                <SlackSVGIcon />
              </div>
              <p className="text-white text-xs font-Poppins tracking-tight">
                Connected
              </p>
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
          <Popover>
            <PopoverTrigger>
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
            </PopoverTrigger>
            <PopoverContent className="w-[290px] border mr-10 font-Poppins p-0 bg-[#1f1f21] text-[#DDDDDD] rounded-lg shadow-lg animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 duration-200">
        <div className="flex items-center space-x-4 p-4 border-b border-[#2a2a2a]">
          <Avatar className="w-9 h-9">
            <AvatarImage src={user.github_avatar_url} alt="Frankie Sullivan" />
            <AvatarFallback>FS</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate flex items-center">
              {user.username}
              <Check className="w-4 h-4 ml-1 text-[#ff8d59]" />
            </p>
            <p className="text-xs text-[#888888] truncate">@{user.username}</p>
          </div>

        </div>
        <div className="py-2 border-b border-[#2a2a2a]">
          <Button variant="ghost" className="w-full justify-start text-[13px] hover:text-white hover:bg-[#444444] text-white/50 rounded-none">
            <Settings className="w-4 h-4 mr-1" />
            Account settings
          </Button>
          <Button variant="ghost" className="w-full justify-start text-[13px] hover:bg-[#444444] rounded-none text-white/50 hover:text-white">
            <Smartphone className="w-4 h-4 mr-1" />
            Device management
          </Button>
          <Button variant="ghost" className="w-full justify-start text-[13px] hover:text-white hover:bg-[#2f2f2f] rounded-none text-white/50">
            <LogOut className="w-4 h-4 mr-1" />
            Sign out
          </Button>
        </div>
        <div className="py-2">
          <p className="px-4 py-1 text-[10px] font-semibold text-[#AAAAAA] uppercase">Switch Account</p>
         <div className="flex gap-4 mt-2 flex-col" >
         {["voiiddxx", "astro.tsx"].map((name, index) => (
            <Button key={name} variant="ghost" className="w-full py-4    justify-start text-[13px] hover:text-white hover:bg-[#444444] rounded-none">
              <Avatar className="w-7 h-7 mr-1">
                <AvatarImage src={user.github_avatar_url} alt={name} />
                <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-xs font-medium truncate">{name}</p>
                <p className="text-xs text-[#888888] truncate">{name.toLowerCase().replace(' ', '')}@example.com</p>
              </div>
              {index === 0 && <div className="w-2 h-2 bg-[#3A84FF] rounded-full"></div>}
            </Button>
          ))}
         </div>
        </div>
        <div className="p-2">
          <Button variant="secondary" className="w-full bg-[#2c2c2e] border border-white/10 hover:bg-[#555555] text-[#DDDDDD]">
            <p className=" font-normal text-xs tracking-tight" >Sign out of all accounts</p>
          </Button>
        </div>
      </PopoverContent>
          </Popover>
       
        </div>
      </div>
    </div>
  );
};

export default TopBar;

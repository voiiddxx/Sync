"use client";
import { Dot, PanelRightOpen, Rabbit, Search } from "lucide-react";
import React from "react";
import {
  BeakerIcon,
  BoltIcon,
  CircleStackIcon,
  CogIcon,
  FireIcon,
  HomeIcon,
  InboxArrowDownIcon,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { updateCurrentTab } from "@/store/slices/windowSlice";
import Image from "next/image";

const sideBarOptions = [
  {
    label: "Dashboard",
    icon: <HomeIcon className="size-5 " />,
    href: "/",
    popup: "Home",
  },
  {
    label: "Profile",
    icon: <BoltIcon className="size-5" />,
    href: "/",
    popup: "Profile",
  },
  {
    label: "Commits",
    icon: <FireIcon className="size-5" />,
    href: "/",
    popup: "Commits",
  },
  {
    label: "Pull Requests",
    icon: <InboxArrowDownIcon className="size-5" />,
    href: "/",
    popup: "PullRequests",
  },
  {
    label: "Repositories",
    icon: <CircleStackIcon className="size-5" />,
    href: "/",
    popup: "Repositories",
  },
  {
    label: "Settings",
    icon: <CogIcon className="size-5" />,
    href: "/",
    popup: "Settings",
  },
];

const SideBar = () => {
  const user = useSelector((state: any) => state.user.value);
  const window = useSelector((state: any) => state.window.value);
  const activeTab = useSelector((state:any)=>state.window.currentTab);
  const dispatch = useDispatch();

  const slackUrl = `https://slack.com/oauth/v2/authorize?client_id=7867821280625.7914237431189&scope=chat:write,chat:write.public,channels:read,chat:write.customize,incoming-webhook&redirect_uri=https://floww-one.vercel.app/api/auth/callback/slack&state=${user.username}`;

  return (
    <div className="h-screen px-4  border-r py-4 w-full dark:bg-[#121212] dark:text-white">
      <div className=" flex items-center justify-between gap-2">
        <div className=" flex gap-1 items-center">
          <Image className="h-8 w-8" src={'/logo.png'} height={1500} width={1500} alt="logo" />
          {window && <p className="font-Poppins text-lg font-bold text-black dark:text-white">Floww</p>}
        </div>

        <div>{/* <PanelRightOpen size={20} strokeWidth={1.5} /> */}</div>
      </div>

      {/* search tab */}
      <div className="mt-8">
        <div
          className={`h-10 shadow-sm transition-all duration-500 ${
            window
              ? "w-full flex justify-between items-center px-2 border dark:bg-stone-800 shadow-sm rounded-md"
              : "w-10 bg-black dark:bg-stone-700 shadow-lg flex items-center justify-center rounded-full"
          } `}
        >
          <div className=" flex gap-1 items-center text-zinc-500 dark:text-white font-Poppins">
            <Search size={20} className={`${!window && "text-white "}`} />
            {window && <p className="font-normal text-sm ">Search</p>}
          </div>

          {window && (
            <div className="h-6 w-6 bg-zinc-100 rounded-md flex items-center justify-center dark:bg-stone-700">
              <p className="font-mono font-bold text-sm">/</p>
            </div>
          )}
        </div>
      </div>

      {/* navigateion section */}
      <div className="w-full flex flex-col">
        {window && (
          <p className="text-xs font-mono mt-4 text-zinc-500 font-semibold">
            Navigation
          </p>
        )}
        <div className="mt-3"></div>

        <div className=" flex flex-col gap-3">
          {sideBarOptions.map((curr: any, index: number) => {
            return (
              <div key={index} onClick={()=>{
                dispatch(updateCurrentTab(curr.popup))
              }} className={`w-full group cursor-pointer relative h-10 flex items-center gap-2 -md  hover:text-zinc-950 hover:bg-zinc-100 hover:dark:bg-[#181818] hover:dark:text-white hover:dark:bg-opacity-65 px-2 rounded-lg ${activeTab === curr.popup ? 'bg-zinc-100 dark:bg-stone-700 dark:bg-opacity-40 text-black dark:text-white ' :'text-gray-600 dark:text-white dark:text-opacity-50'}`}>
                <div className="ml-1" >{curr.icon}</div>
                <p
                  className={`font-normal font-Poppins tracking-tight text-sm transition-all duration-500 ${
                    window ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {curr.label}
                </p>

                {!window && (
                  <div
                    className={`absolute left-14 px-2 py-2 bg-zinc-800 z-50 text-white border shadow-2xl shadow-slate-800 rounded-lg 
                items-center justify-center 
                transition-all duration-100 transform scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100`}
                  >
                    <p className="font-Poppins text-xs tracking-tight ">
                      {curr.popup}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="h-[1px] w-full bg-zinc-300 mt-8"></div>
      {window && (
        <p className="text-xs font-mono mt-4 text-gray-500 font-semibold">
          Your Apps
        </p>
      )}

      <Link href={slackUrl}>
        <div className="flex gap-2 mt-4 items-center justify-between">
          <div className=" flex items-center gap-2">
            <div className="h-8 w-8 border shadow-md rounded-md flex items-center justify-center overflow-hidden p-1">
              <SlackSVGIcon />
            </div>

            <p
              className={`text-sm font-medium text-gray-700 transition-all duration-500 ${
                window ? "opacity-100" : "opacity-0"
              }`}
            >
              Slack
            </p>
          </div>
          <div>
            {user?.slack_access_token ? (
              <Dot className="text-green-500" size={35} />
            ) : (
              <Dot className="text-red-500" size={35} />
            )}
          </div>
        </div>
      </Link>
      <div className="flex gap-2 mt-4 items-center justify-between">
        <div className=" flex items-center gap-2">
          <div className="h-8 w-8 border shadow-md rounded-md flex items-center justify-center overflow-hidden p-1">
            <GithubIcon  />
          </div>
          <p
            className={`text-sm font-medium text-gray-700 transition-all duration-500 ${
              window ? "opacity-100" : "opacity-0"
            }`}
          >
            Github
          </p>
        </div>
        <div>
          <Dot className="text-green-500" size={35} />
        </div>
      </div>
      <div className="flex gap-2 mt-4 items-center justify-between">
        <div className=" flex items-center gap-2">
          <div className="h-8 w-8 border shadow-md rounded-md flex items-center justify-center overflow-hidden p-1">
            <LinedInIcon />
          </div>
          <p
            className={`text-sm font-medium text-gray-700 transition-all duration-500 ${
              window ? "opacity-100" : "opacity-0"
            }`}
          >
            Linkedin
          </p>
        </div>
        <div>
          <Dot className="text-red-500" size={35} />
        </div>
      </div>
      <div className="flex gap-2 mt-4 items-center justify-between">
        <div className=" flex items-center gap-2">
          <div className="h-8 w-8 border shadow-md rounded-md flex items-center justify-center overflow-hidden p-1">
            <TwitterIcon />
          </div>
          <p
            className={`text-sm font-medium text-gray-700 transition-all duration-500 ${
              window ? "opacity-100" : "opacity-0"
            }`}
          >
            Twitter
          </p>
        </div>
        <div>
          <Dot className="text-green-500" size={35} />
        </div>
      </div>
    </div>
  );
};

export default SideBar;

export const SlackSVGIcon = () => (
  <svg
    width="64px"
    height="64px"
    viewBox="-245.25 -245.25 2943.00 2943.00"
    enable-background="new 0 0 2447.6 2452.5"
    xmlns="http://www.w3.org/2000/svg"
    fill="#000000"
    transform="rotate(0)matrix(-1, 0, 0, 1, 0, 0)"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke="#ffffff"
      stroke-width="4.905"
    ></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <g clip-rule="evenodd" fill-rule="evenodd">
        {" "}
        <path
          d="m897.4 0c-135.3.1-244.8 109.9-244.7 245.2-.1 135.3 109.5 245.1 244.8 245.2h244.8v-245.1c.1-135.3-109.5-245.1-244.9-245.3.1 0 .1 0 0 0m0 654h-652.6c-135.3.1-244.9 109.9-244.8 245.2-.2 135.3 109.4 245.1 244.7 245.3h652.7c135.3-.1 244.9-109.9 244.8-245.2.1-135.4-109.5-245.2-244.8-245.3z"
          fill="#36c5f0"
        ></path>{" "}
        <path
          d="m2447.6 899.2c.1-135.3-109.5-245.1-244.8-245.2-135.3.1-244.9 109.9-244.8 245.2v245.3h244.8c135.3-.1 244.9-109.9 244.8-245.3zm-652.7 0v-654c.1-135.2-109.4-245-244.7-245.2-135.3.1-244.9 109.9-244.8 245.2v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.3z"
          fill="#2eb67d"
        ></path>{" "}
        <path
          d="m1550.1 2452.5c135.3-.1 244.9-109.9 244.8-245.2.1-135.3-109.5-245.1-244.8-245.2h-244.8v245.2c-.1 135.2 109.5 245 244.8 245.2zm0-654.1h652.7c135.3-.1 244.9-109.9 244.8-245.2.2-135.3-109.4-245.1-244.7-245.3h-652.7c-135.3.1-244.9 109.9-244.8 245.2-.1 135.4 109.4 245.2 244.7 245.3z"
          fill="#ecb22e"
        ></path>{" "}
        <path
          d="m0 1553.2c-.1 135.3 109.5 245.1 244.8 245.2 135.3-.1 244.9-109.9 244.8-245.2v-245.2h-244.8c-135.3.1-244.9 109.9-244.8 245.2zm652.7 0v654c-.2 135.3 109.4 245.1 244.7 245.3 135.3-.1 244.9-109.9 244.8-245.2v-653.9c.2-135.3-109.4-245.1-244.7-245.3-135.4 0-244.9 109.8-244.8 245.1 0 0 0 .1 0 0"
          fill="#e01e5a"
        ></path>{" "}
      </g>{" "}
    </g>
  </svg>
);

export const LinedInIcon = () => (
  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path
        fill="#ffffff"
        d="M12.225 12.225h-1.778V9.44c0-.664-.012-1.519-.925-1.519-.926 0-1.068.724-1.068 1.47v2.834H6.676V6.498h1.707v.783h.024c.348-.594.996-.95 1.684-.925 1.802 0 2.135 1.185 2.135 2.728l-.001 3.14zM4.67 5.715a1.037 1.037 0 01-1.032-1.031c0-.566.466-1.032 1.032-1.032.566 0 1.031.466 1.032 1.032 0 .566-.466 1.032-1.032 1.032zm.889 6.51h-1.78V6.498h1.78v5.727zM13.11 2H2.885A.88.88 0 002 2.866v10.268a.88.88 0 00.885.866h10.226a.882.882 0 00.889-.866V2.865a.88.88 0 00-.889-.864z"
      ></path>
    </g>
  </svg>
);

export const GithubIcon = () => (
  <svg
    width="64px"
    height="64px"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path
        fill="#ffffff"
        fill-rule="evenodd"
        d="M8 1C4.133 1 1 4.13 1 7.993c0 3.09 2.006 5.71 4.787 6.635.35.064.478-.152.478-.337 0-.166-.006-.606-.01-1.19-1.947.423-2.357-.937-2.357-.937-.319-.808-.778-1.023-.778-1.023-.635-.434.048-.425.048-.425.703.05 1.073.72 1.073.72.624 1.07 1.638.76 2.037.582.063-.452.244-.76.444-.935-1.554-.176-3.188-.776-3.188-3.456 0-.763.273-1.388.72-1.876-.072-.177-.312-.888.07-1.85 0 0 .586-.189 1.924.716A6.711 6.711 0 018 4.381c.595.003 1.194.08 1.753.236 1.336-.905 1.923-.717 1.923-.717.382.963.142 1.674.07 1.85.448.49.72 1.114.72 1.877 0 2.686-1.638 3.278-3.197 3.45.251.216.475.643.475 1.296 0 .934-.009 1.688-.009 1.918 0 .187.127.404.482.336A6.996 6.996 0 0015 7.993 6.997 6.997 0 008 1z"
        clip-rule="evenodd"
      ></path>
    </g>
  </svg>
);

export const TwitterIcon = () => (
  <svg
    width="64px"
    height="64px"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
  >
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></g>
    <g id="SVGRepo_iconCarrier">
      <path
        fill="#ffffff"
        d="M13.567 5.144c.008.123.008.247.008.371 0 3.796-2.889 8.173-8.172 8.173v-.002A8.131 8.131 0 011 12.398a5.768 5.768 0 004.25-1.19 2.876 2.876 0 01-2.683-1.995c.431.083.875.066 1.297-.05A2.873 2.873 0 011.56 6.348v-.036c.4.222.847.345 1.304.36a2.876 2.876 0 01-.89-3.836 8.152 8.152 0 005.92 3 2.874 2.874 0 014.895-2.619 5.763 5.763 0 001.824-.697 2.883 2.883 0 01-1.262 1.588A5.712 5.712 0 0015 3.656a5.834 5.834 0 01-1.433 1.488z"
      ></path>
    </g>
  </svg>
);

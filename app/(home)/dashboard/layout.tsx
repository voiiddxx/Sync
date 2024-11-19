"use client";

import SecondaryTopBar from "../../../components/shared/dashboard/SecondaryTopBar";
import SideBar from "../../../components/shared/dashboard/sideBar";
import TopBar from "../../../components/shared/dashboard/topBar";
import { ChevronDownCircle, ChevronUpCircle } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function DashboardLayout({ children }: any) {
  const window = useSelector((state: any) => state.window.value);
  const darkmode = useSelector((state: any) => state.window.darkMode);
  const [showTopBar, setshowTopBar] = useState<boolean>(true);

  return (
    <div className={"dark"}>
      <div className="w-full h-screen flex overflow-hidden">
        {/* left div */}
        <div
          className={` transition-all duration-500 ${window ? "w-72" : "w-20"}`}
        >
          <SideBar />
        </div>

        {/* righr div */}
        <div className=" h-screen w-full dark:bg-[#121212]">
          {/* upper bar */}
          <div className="h-[60px] w-full border-b">
            <TopBar />

            <div
              onClick={() => setshowTopBar(!showTopBar)}
              className=" h-8 w-8 absolute right-28 z-50 top-4 rounded-full bg-[#262626] flex items-center justify-center"
            >
              {showTopBar ? (
                <ChevronUpCircle className="text-white/70" />
              ) : (
                <ChevronDownCircle className="text-white/70" />
              )}
            </div>
          </div>
          <SecondaryTopBar showTopBar={showTopBar} />
          {children}
        </div>
      </div>
    </div>
  );
}

"use client";

import SideBar from "@/components/shared/dashboard/sideBar";
import TopBar from "@/components/shared/dashboard/topBar";
import { useSelector } from "react-redux";

export default function DashboardLayout({ children }: any) {
  const window = useSelector((state: any) => state.window.value);
  return (
    <div className="w-full h-screen flex overflow-hidden">
      {/* left div */}
      <div className={` transition-all duration-500 ${window ?'w-72' : 'w-20'}`}>
        <SideBar />
      </div>

      {/* righr div */}
      <div className=" h-screen w-full">
        {/* upper bar */}
        <div className="h-[60px] w-full border-b">
          <TopBar />
        </div>
          {children}
      </div>
    </div>
  );
}

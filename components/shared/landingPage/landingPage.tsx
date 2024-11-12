"use client";

import React from "react";
import NavBar from "./navbar";
import FirstFold from "./firstFold";
import { useSelector } from "react-redux";
import Image from "next/image";
import { Terminal } from "lucide-react";

const LandingPage = () => {
  const darkmode = useSelector((state: any) => state.window.darkMode);
  return (
    <div className={`${darkmode ? "dark" : ""}`}>
      <div style={{
         scrollbarWidth: "none",
         msOverflowStyle: "none",
         WebkitOverflowScrolling: "touch",
      }} className=" w-full min-h-screen h-screen overflow-scroll bg-[#050505] dark:bg-[#050505] ">
        <div className=" w-full sticky top-0 z-50">
          <NavBar />
        </div>

        <div className=" w-auto px-52 mt-10 relative z-20" >
          <div className=" w-auto min-h-[1600px] border relative ">
            <FirstFold />
            <div className=" w-full overflow-hidden flex items-center justify-center mt-10 flex-col border-t h-64 border-b relative " >
              <Terminal strokeWidth={3} className="text-white mb-2" />
              <h1 className="text-white text-2xl font-mono tracking-wider font-semibold z-50 text-center" >Sync With Flow</h1>
              <h1 className="text-white text-2xl font-mono tracking-wider font-semibold text-center z-50" >Then schedule on Flow</h1>
          <Image className="absolute opacity-25 grayscale hover:grayscale-0 transition-all hover:scale-110 hover:rotate-12 duration-1000 ease-in-out" src={`/flow.svg`} height={1500} width={1500} alt="flow" />
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

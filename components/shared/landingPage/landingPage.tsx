"use client";

import React from "react";
import NavBar from "./navbar";
import FirstFold from "./firstFold";
import { useSelector } from "react-redux";

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
            <div className=" w-full h-56 border-b" >

            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

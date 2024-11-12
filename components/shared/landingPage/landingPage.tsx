"use client";

import React from "react";
import NavBar from "./navbar";
import FirstFold from "./firstFold";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const darkmode = useSelector((state: any) => state.window.darkMode);
  return (
    <div className={`${darkmode ? "dark" : ""}`}>
      <div className=" w-full min-h-screen h-screen bg-[#050505] dark:bg-[#050505] ">
        <div className=" w-full sticky top-0">
          <NavBar />
        </div>

        <div className=" w-auto px-40 mt-10 relative" >
          <div className=" w-auto h-[900px] border relative ">
            <FirstFold />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

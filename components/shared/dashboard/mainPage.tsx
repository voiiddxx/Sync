"use client";

import React from "react";
import DashBoardTabSection from "./dashboardTab";

const MainPage = () => {
  return (
    <div className=" w-full h-full dark:bg-[#121212]">
      <div className="max-h-[84vh] overflow-hidden  w-full bg-zinc-100  dark:bg-[#121212]">
        <DashBoardTabSection />
      </div>
    </div>
  );
};

export default MainPage;

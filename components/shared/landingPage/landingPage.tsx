'use client'

import React from "react";
import NavBar from "./navbar";
import FirstFold from "./firstFold";
import { useSelector } from "react-redux";

const LandingPage = () => {

  const darkmode = useSelector((state:any)=>state.window.darkMode);
   return (
   <div className={`${darkmode ? "dark" : ""}`} >
      
    <div className=" w-full min-h-screen bg-white dark:bg-[#050505]">
      <div className=" w-full sticky top-0">
        <NavBar />
      </div>

      <div className=" h-full w-full bg-white" >
    <FirstFold/>
      </div>
    </div>
  </div>
  );
};

export default LandingPage;

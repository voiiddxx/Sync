import React from "react";
import NavBar from "./navbar";
import FirstFold from "./firstFold";

const LandingPage = () => {
  return (
    <div className=" w-full min-h-screen bg-white">
      <div className=" w-full sticky top-0">
        <NavBar />
      </div>

      <div className=" h-full w-full bg-white" >
    <FirstFold/>
      </div>
    </div>
  );
};

export default LandingPage;

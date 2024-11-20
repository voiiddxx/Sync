import MainPage from "@/components/shared/merge/mainPage";
import React from "react";

const page = () => {
  return (
    <div
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        WebkitOverflowScrolling: "touch",
      }}
      className=" w-full h-screen overflow-scroll  bg-white"
    >
        <MainPage/>
    </div>
  );
};

export default page;

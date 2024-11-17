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
    ></div>
  );
};

export default page;

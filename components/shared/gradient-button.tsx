import { Loader } from "lucide-react";
import React from "react";

const GradientButton = ({ isLoading, onClick , title }: any) => {
  return (
    <div
      onClick={onClick}
      className="relative px-4 py-2 rounded-lg bg-gradient-to-b from-purple-700 to-purple-500 flex items-center justify-center 
transition-transform duration-300 ease-in-out cursor-pointer hover:scale-105 hover:from-purple-600 hover:to-purple-400"
    >
      <p
        className={`text-xs text-white transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        {title}
      </p>
      <Loader
        className={`absolute animate-spin text-white w-5 h-5 transition-opacity duration-1000 ${
          isLoading ? "opacity-100 " : "opacity-0"
        }`}
      />
    </div>
  );
};

export default GradientButton;

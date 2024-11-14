"use client";
import { updateDarkMode } from "@/store/slices/windowSlice";
import { Rabbit, Search } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { GithubIcon } from "../dashboard/sideBar";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const NavBar = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state: any) => state.window.darkMode);

  const options = ["Documentations", "Products", "Blog", "Showcase"];
  return (
    <div className=" w-full px-36 py-4">
      <div className=" h-12 w-full flex items-center justify-between border rounded-2xl px-4 bg-black bg-opacity-50 backdrop-blur-md">
        <div className=" flex gap-3 items-center">
          <div className="flex gap-1 items-center">
            <Image
              className="h-8 w-8 "
              src={"/logo.png"}
              height={1500}
              width={1500}
              alt="logo"
            />
            <p className="text-sm font-Poppins  font-medium text-white/60">
              Flow
            </p>
          </div>
          <div className="flex gap-4 ml-6">
            {options.map((option, index) => (
              <p
                key={index}
                onClick={() => dispatch(updateDarkMode(!darkMode))}
                className={`text-xs font-Poppins font-light text-white/60 ${
                  index === 2 ? "text-gray-500" : "text-white"
                } hover:text-gray-500  border-b-white hover:border-b-2 transition duration-300 ease-in-out `}
              >
                {option}
              </p>
            ))}
          </div>
        </div>

        <div className=" flex gap-2 items-center" >
            <div className="h-[35px] w-64 px-2 border bg-gradient-to-r from-[#161616] to-[#161616] bg-opacity-45 rounded-full border-zinc-800 flex items-center justify-between" >
            <div className="flex items-center gap-1" >
              <Search size={20} className="text-white/50" />
              <p className="text-white/60 font-normal text-sm" >Search</p>
            </div>

            <div className=" flex items-center gap-2" >
              <p className="bg-black text-white/50 text-xs font-Poppins px-1 py-1 border rounded-md border-zinc-700" >Ctrl</p>
              <p className="bg-black text-white/50 text-xs font-Poppins px-2 py-1 border rounded-md border-zinc-700" >K</p>
            </div>
            </div>
            <GitHubLogoIcon className="text-white/50 size-6" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;

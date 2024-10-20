"use client";

import {
  ArrowPathIcon,
  ChevronUpDownIcon,
  PlusCircleIcon,
  ServerStackIcon,
} from "@heroicons/react/24/solid";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { GitBranch, GitPullRequestArrowIcon, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import DashBoardTabSection from "./dashboardTab";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ComboBox from "../combobox";
import { updateUserRepo } from "@/store/slices/repoSlice";

const MainPage = () => {
  const dispatch = useDispatch();
  const repo = useSelector((state: any) => state.repo.value);
  const user = useSelector((state: any) => state.user.value);
  const [userRepos, setuserRepos] = useState<any[]>([]);
  const [branches, setbranches] = useState<any[]>([]);


  const getAllRepos = async (username: string) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/api/github/repo?username=${username}`
      );
      if (res.status !== 200) {
        console.log("Error getting repositories");
        // show toast here
        return false;
      }

      if (res?.data?.data?.length > 0) {
        const formattedData = res.data.data.map((curr: any) => ({
          label: curr.name,
          value: curr.name,
          data: curr,
        }));
        setuserRepos(formattedData);
      }
    } catch (error) {
      console.log(error);
      // show toast
    }
  };

  const getSpecificRepo = async (repo: string, username: string) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/github/repo/get`,
        {
          repo,
          username,
        }
      );
      if (res.status !== 200) {
        // show popup
        console.log("Some error occured");
        return;
      }
      dispatch(updateUserRepo(res.data.repo));

      const repoBranches= res.data.repo.branches.map((curr:any)=>({
        label: curr.name,
        value: curr.name,
        data: curr,
      }));

      setbranches(repoBranches);
    } catch (error) {
      console.log(error);
      // show popup
    }
  };

  useEffect(() => {
    getAllRepos(user?.username);
  }, []);

  return (
    <div className=" w-full h-full">
      {/* upper */}
      <div className="h-16 w-full flex justify-between px-6 border-b">
        {/* left div */}
        <div className="flex items-center justify-between gap-2">
          <ComboBox
            data={userRepos}
            onChange={(data: any) => {
              getSpecificRepo(data?.value, user?.username);
            }}
            icon={<GitHubLogoIcon />}
          />
          <ComboBox
            data={branches}
            onChange={(data: any) => {
              getSpecificRepo(data?.value, user?.username);
            }}
            icon={<GitBranch size={20} />}
          />
        </div>
        <div className=" flex items-center gap-2">
          <div className=" h-10 w-10 rounded-md border flex items-center shadow-sm justify-center">
            <PlusCircleIcon className="size-5 text-zinc-700" />
          </div>
          <div className=" h-10 w-10 rounded-md border flex items-center shadow-sm justify-center">
            <ServerStackIcon className="size-4 text-zinc-700" />
          </div>
          <div className=" h-10 w-10 rounded-md border flex items-center shadow-sm justify-center">
            <GitPullRequestArrowIcon className="size-4 text-zinc-700" />
          </div>

          <div className="h-10 w-[250px] flex justify-between items-center px-2 border rounded-md">
            <div className=" flex gap-1 items-center text-zinc-500">
              <Search size={18} className="" />
              <p className="font-medium text-sm ">Type / to search</p>
            </div>

            <div className="h-6 w-6 bg-zinc-100 rounded-md flex items-center justify-center">
              <p className="font-mono font-bold text-sm">/</p>
            </div>
          </div>
        </div>
      </div>

      {/* bottom sectiom */}
      <div className="h-[84vh] w-full bg-zinc-100">
        <DashBoardTabSection />
      </div>
    </div>
  );
};

export default MainPage;

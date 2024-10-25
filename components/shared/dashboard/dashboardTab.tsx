"use client";

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BugAntIcon,
  FireIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/solid";
import { GitPullRequestArrow, PanelLeft } from "lucide-react";
import ScheduledCommit from "./shceduledCommit";
import RequestedCommits from "./requestedCommit";
import ActivitySection from "./activityPage";
import { useSelector } from "react-redux";
import axios from "axios";

const DashBoardTabSection = () => {

  const repo = useSelector((state: any) => state.repo.value);
  const user = useSelector((state: any) => state.user.value);
  const [activities, setActivities] = useState<any>([]);
  const [showActivity, setShowActivity] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const fetchRecentActivity = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/api/github/activity?username=${user.username}`);
      console.log(res.data);
      setActivities(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleActivity = () => {
    if (showActivity) {
      setIsAnimating(true);
      // Don't immediately hide the content - keep showing it during animation
      setTimeout(() => {
        setShowActivity(false);
        setIsAnimating(false);
      }, 400);
    } else {
      setShowActivity(true);
    }
  };

  useEffect(() => {
    fetchRecentActivity();
  }, []);

  return (
    <div className="w-full h-full flex gap-2 py-2 px-2 ">
      <div className="bg-white h-[84vh] w-full rounded-md py-2  ">
        <Tabs defaultValue="commit" className="w-full">
          <TabsList>
            <TabsTrigger value="request">
              <FireIcon className="size-4 ml-1 mr-1" />
              Requested Commits
              <div className="h-3 w-3 rounded-full bg-green-500 flex items-center justify-center ml-1">
                <p className="text-[8px] font-medium text-white">2</p>
              </div>
            </TabsTrigger>
            <TabsTrigger value="commit">
              <FireIcon className="size-4 ml-1 mr-1" />
              Sheduled Commits
              <div className="h-3 w-3 rounded-full bg-green-500 flex items-center justify-center ml-1">
                <p className="text-[8px] font-medium text-white">2</p>
              </div>
            </TabsTrigger>
            <TabsTrigger className="px-4" value="branch">
              <Squares2X2Icon className="size-4 ml-1 mr-1" />
              Branches
            </TabsTrigger>
            <TabsTrigger className="px-4" value="pr">
              <GitPullRequestArrow className="size-4 mr-1 ml-1" />
              Scheduled pull requests
              <div className="h-3 w-3 rounded-full bg-green-500 flex items-center justify-center ml-1">
                <p className="text-[8px] font-medium text-white">2</p>
              </div>
            </TabsTrigger>
            <TabsTrigger className="issues" value="password">
              <BugAntIcon className="size-4 ml-1 mr-1" />
              Issues
            </TabsTrigger>
          </TabsList>
          <TabsContent value="commit">
            <div className="  w-full px-2 py-1 ">
              <ScheduledCommit data={repo?.scheduledCommit} />
            </div>
          </TabsContent>
          <TabsContent value="request">
            <div className=" h-full w-full px-2 py-1">
              <RequestedCommits data={repo?.reqCommit} />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className={`min-w-1/3 max-w-1/3 relative bg-white rounded-md transition-transform duration-500 ease-in-out
        ${!showActivity || isAnimating ? 'translate-x-full' : 'translate-x-0'}`}
      > 

    
        {/* <div onClick={handleActivity} className="absolute right-4 h-6 w-6 top-4 rounded-full bg-purple-700" /> */}
        <div onClick={handleActivity} className="p-1 cursor-pointer hover:bg-zinc-50 rounded-md flex items-center justify-center absolute right-4 top-4" >
          <PanelLeft size={16} />
        </div>
        {/* Show content while either showActivity is true OR animation is in progress */}
        {(showActivity || isAnimating) && (
          <ActivitySection activities={activities} />
        )}
      </div>
    </div>
  );
};

export default DashBoardTabSection;

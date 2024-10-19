import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BugAntIcon,
  Cog6ToothIcon,
  FireIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/solid";
import { GitPullRequestArrow } from "lucide-react";
import ScheduledCommit from "./shceduledCommit";
import RequestedCommits from "./requestedCommit";

const DashBoardTabSection = () => {
  return (
    <div className="w-full h-full flex gap-2 py-2 px-2 ">
      <div className="bg-white w-2/3 rounded-md py-2  ">
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
            <div className=" h-full w-full px-2 py-1">
              <ScheduledCommit />
           
            </div>
          </TabsContent>
          <TabsContent value="request">
          <div className=" h-full w-full px-2 py-1">
              <RequestedCommits />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className=" w-1/3 bg-white rounded-md"></div>
    </div>
  );
};

export default DashBoardTabSection;

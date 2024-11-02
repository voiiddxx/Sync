"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  ChevronDown,
  ChevronRight,
  FileText,
  FolderPlus,
  GitBranch,
  GitCommit,
  GitPullRequest,
  Loader,
  Plus,
  Slack,
  Trash,
  Trash2,
  Upload,
  User,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { DotsHorizontalIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import EditScheduleModal from "./editSchedulemodal";
import CustomModal from "../modal";
import DeleteModalComponent from "./delete-modal";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RectangleStackIcon } from "@heroicons/react/24/solid";

export default function CommitPannel({ data, user }: any) {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const milliseconds = Math.floor((time * 10) % 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${milliseconds}`;
  };

  const [currentDiffFile, setcurrentDiffFile] = React.useState<any>(null);
  const [diffFileData, setdiffFileData] = React.useState<any>(null);

  const [isLoading, setisLoading] = React.useState<boolean>(false);
  React.useEffect(() => {
    diffFileChangeComp();
  }, [currentDiffFile]);

  const diffFileChangeComp = React.useCallback(() => {
    if (currentDiffFile) {
      const lines = currentDiffFile.content.split("\n");
      setdiffFileData(lines);
    } else {
      if(data && data.diffFile){
        setdiffFileData(data?.diffFile[0].content.split("\n"));
      }
    }
  }, [currentDiffFile]);

  return (
    <div
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        WebkitOverflowScrolling: "touch",
      }}
      className="flex flex-col h-[90vh] pb-32 overflow-scroll  bg-[#161616] text-zinc-300 text-xs font-Poppins tracking-tight border-t border-l border-r rounded-xl"
    >
      <div className="flex flex-1 ">
        {/* Changes Panel (Left Sidebar) */}
        <div className="w-64 h-[60vh]  dark:bg-[#161616] border-r rounded-l-xl border-zinc-800 flex flex-col">
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <div className="text-[11px] font-semibold text-zinc-500">
                  Changed Files
                </div>
                {data?.diffFile.map((file: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 text-[11px]"
                  >
                    <FileText className="w-3 h-3 text-blue-400" />
                    <span>{file?.path}</span>
                    <span className="px-1 py-0.5 bg-zinc-700 text-zinc-400 rounded text-[10px]">
                      Modified
                    </span>
                  </div>
                ))}
              </div>
              <Separator className="bg-zinc-800" />
              <Collapsible>
                <CollapsibleTrigger className="flex items-center text-[11px] font-semibold text-zinc-500">
                  <ChevronDown className="w-3 h-3 mr-1" />
                  Stashed Changes
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 space-y-2">
                  <div className="text-[11px] pl-4">feature/new-component</div>
                  <div className="text-[11px] pl-4">
                    bugfix/typescript-error
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </ScrollArea>
          <div className="p-4 border-t border-zinc-700">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-xs justify-between dark:bg-[#23232392] font-normal border-zinc-700 text-zinc-300"
                >
                  <div className="flex items-center">
                    <GitBranch className="mr-2 h-3 w-3" strokeWidth={1.25} />
                    <p className="">main</p>
                  </div>
                  <ChevronDown className="h-3 w-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-[200px] bg-[#282828] border-zinc-700 text-zinc-300"
              >
                <DropdownMenuItem>Pull origin</DropdownMenuItem>
                <DropdownMenuItem>Switch branch</DropdownMenuItem>
                <DropdownMenuItem>Merge</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* File Diff Viewer (Main Section) */}
        <div className="flex-1 h-[60vh] overflow-hidden flex flex-col dark:bg-[#1f1f1f87] rounded-r-xl">
          <div className="flex items-center justify-between p-2 border-b border-zinc-800">
            <div className="flex items-center space-x-2">
              <span className="text-blue-400 font-semibold">TypeScript</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-zinc-800 border-zinc-700 text-zinc-300"
                  >
                    index.ts
                    <ChevronDown className="ml-2 h-3 w-3 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-[200px] bg-[#262626]  border-zinc-700 text-zinc-300"
                >
                  {data?.diffFile.map((curr: any, index: number) => {
                    return (
                      <DropdownMenuItem
                        onClick={() => {
                          setcurrentDiffFile(curr);
                        }}
                        className=""
                        key={index}
                      >
                        <p className="text-xs font-normal font-Poppins">
                          {curr.path}
                        </p>
                      </DropdownMenuItem>
                    );
                  })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex z-10">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <DotsHorizontalIcon className="dark:text-white size-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-[200px] bg-[#262626]  border-zinc-700 text-zinc-300 z-0"
                >
                  <div className=" h-12 flex items-center pl-4 gap-2 justify-start px-2 w-full  border-b border-zinc-700 rounded-t-xl ">
                    <RectangleStackIcon className="size-5 text-white/20" />
                    <p className="text-sm text-white/50 font-normal">Manage</p>
                  </div>
                  <div className=" flex flex-col  ">
                    <CustomModal
                      width={"500px"}
                      prevItem={
                        <div
                          key={""}
                          className="h-12 w-full hover:bg-white/10  px-3 transition-all duration-200 ease-in-out flex items-center justify-between  font-Poppins hover:bg-zinc-50w-full cursor-pointer"
                        >
                          <div className=" flex items-center gap-2">
                            <div className="flex items-center gap-1 text-gray-700">
                              {/* {item.icon} */}
                              <Trash2 className="size-4 text-red-500" />
                            </div>
                            <p className="text-xs font-Poppins font-medium tracking-tight  text-red-500">
                              Delete commit
                            </p>
                          </div>
                          <div>
                            <ChevronRight className="size-3" />
                          </div>
                        </div>
                      }
                      modalContent={(closeModal: any) => (
                        <DeleteModalComponent
                          data={data}
                          closeModal={closeModal}
                        />
                      )}
                    />
                    <CustomModal
                      prevItem={
                        <div
                          key={""}
                          className="h-12 w-full hover:bg-white/10  px-3 transition-all duration-200 ease-in-out flex items-center justify-between  font-Poppins hover:bg-zinc-50w-full cursor-pointer"
                        >
                          <div className=" flex items-center gap-2">
                            <div className="flex items-center gap-1 text-gray-700">
                              {/* {item.icon} */}
                              <GitHubLogoIcon className="size-4 text-white" />
                            </div>
                            <p className="text-xs font-Poppins font-medium tracking-tight  text-white/50">
                              Reschedule commit
                            </p>
                          </div>
                          <div>
                            <ChevronRight className="size-3" />
                          </div>
                        </div>
                      }
                      modalContent={(closeModal: any) => (
                        <EditScheduleModal
                          data={data}
                          closeModal={closeModal}
                        />
                      )}
                    />
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <ScrollArea className="flex-1">
            {diffFileData && (
              <div className="p-4 space-y-1 font-mono text-[11px]">
                {diffFileData.map((line: any, index: number) => {
                  let lineClass = "text-gray-600";
                  if (line.startsWith("+") && !line.startsWith("+++")) {
                    lineClass = "bg-green-500/10 text-green-400";
                  } else if (line.startsWith("-") && !line.startsWith("---")) {
                    lineClass = "bg-red-500/10 text-red-400";
                  } else if (line.startsWith("@@")) {
                    lineClass = "text-blue-400";
                  } else if (
                    line.startsWith("diff --git") ||
                    line.startsWith("index")
                  ) {
                    lineClass = "font-bold text-indigo-500";
                  }

                  return (
                    <div key={index} className="flex">
                      {/* Line number display */}
                      <span className="w-8 text-right pr-2 text-zinc-500">
                        {index + 1}
                      </span>
                      {/* Line content */}
                      <span className={lineClass}>{line}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </div>
      </div>

      {/* Commit Panel (Bottom Section) */}
      <div className="border-t border-zinc-800 p-4 space-y-4 dark:bg-[#1e1e1e]">
        <div className="flex space-x-4">
          <div className="flex-1 space-y-2">
            <Input
              placeholder="Add TypeScript interface for Props"
              className="text-[11px] bg-[#292929] border-zinc-700 text-zinc-300"
            />
            <Textarea
              placeholder="Detailed description (optional)"
              className="text-[11px] h-20 resize-none bg-[#292929] border-zinc-700 text-zinc-300"
            />
          </div>
          <div className="w-48 space-y-2">
            <div className="text-[11px] font-semibold text-zinc-500">
              Co-authors
            </div>
            <div className="flex space-x-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar className="w-6 h-6">
                <AvatarImage src="/placeholder-avatar-2.jpg" />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="outline"
                className="w-6 h-6 bg-zinc-800 border-zinc-700 text-zinc-300"
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-zinc-800 border-zinc-700 text-zinc-300"
                  >
                    <Slack className="mr-2 h-3 w-3" />
                    Slack
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-zinc-800 border-zinc-700 text-zinc-300">
                  <p className="text-[10px]">Enable commit notifications</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-zinc-800 border-zinc-700 text-zinc-300"
                  >
                    <Upload className="mr-2 h-3 w-3" />
                    Force Push
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-zinc-800 border-zinc-700 text-zinc-300">
                  <p className="text-[10px]">Force push this commit</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-zinc-800 border-zinc-700 text-zinc-300"
                  >
                    <Calendar className="mr-2 h-3 w-3" />
                    Schedule
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-zinc-800 border-zinc-700 text-zinc-300">
                  <p className="text-[10px]">Schedule this commit</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Button className="bg-blue-600 text-white hover:bg-blue-700">
            <GitCommit className="mr-2 h-3 w-3" />
            Commit to main
          </Button>
        </div>
      </div>

      {/* User Activity & Sync Information */}
      <div className="border-t border-zinc-800 p-2 flex justify-between border-b items-center text-[10px] text-zinc-500 dark:bg-[#292929]  mt-2">
        <div className="flex items-center space-x-2">
          <Avatar className="w-4 h-4">
            <AvatarImage src={`${user.github_avatar_url}`} />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <span>John Doe committed 5 minutes ago</span>
        </div>
        <div className="flex items-center space-x-2">
          <GitPullRequest className="h-3 w-3" />
          <span>Synced with origin/main</span>
        </div>
      </div>
    </div>
  );
}

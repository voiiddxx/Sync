import {
  BoltIcon,
  CalendarDateRangeIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/solid";
import {  GitHubLogoIcon } from "@radix-ui/react-icons";
import { GitBranch,  } from "lucide-react";
import React, { useState } from "react";

import { SlackSVGIcon } from "./sideBar";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";

const ScheduleModalContent = () => {
  const [date, setDate] = useState<Date>();
  const [commit_message, setcommit_message] = useState<string>("");
  const [isForcePush, setisForcePush] = useState<boolean>(false);
  const [isSlackReminder, setisSlackReminder] = useState<boolean>(false);

  const handleCommitSubmission = async () => {
    try {
      if (commit_message == "") {
        // show alert and return back
        alert("Commit message is required");
        return;
      }

      const res = await axios.post("apiurlforupdatingcommitdetai", {}, {});
    } catch (error) {
      console.log(error);
      // show popup of error
    }
  };

  return (
    <div className=" w-full font-Poppins min-h-48 relative">
      <div className="">
        <div className=" w-full border-b px-4 py-4 bg-zinc-50 rounded-t-lg flex items-center gap-2">
          <GitHubLogoIcon className="size-9" />
          <div>
            <p className=" tracking-tight">Schedule commit</p>
            <p className="text-xs  text-gray-700  tracking-tight">
              Want to commit later? schedule now
            </p>
          </div>
        </div>

        <div className="px-5 mt-6 pb-6">
          <p className="text-sm">Commit message</p>

          <div className="flex border rounded-lg w-full h-10 mt-2 ">
            <div className="w-12 flex items-center justify-center h-full border-r">
              <BoltIcon className="size-4 text-purple-700" />
            </div>

            <input
              onChange={(event) => {
                setcommit_message(event.target.value);
              }}
              type="text"
              className="border-none mr-1 outline-none w-full h-full text-xs focus:border-none focus:outline-none px-2"
              placeholder="Enter your commit message"
            />
          </div>

          <div className="flex flex-col mt-6">
            <div className="px-2 py-1 border w-fit flex items-center gap-1 rounded-full bg-zinc-50">
              <GitBranch size={15} strokeWidth={1.25} />
              <p className="text-[13px] tracking-tight ">
                github/voiiddxx/flow-cli/commits
              </p>
            </div>
          </div>

          {/* slack */}
          <div className="py-2 w-full   flex items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              <div className="h-10 px-2 w-10 border rounded-md flex items-center justify-center">
                <RocketLaunchIcon className="size-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm tracking-tight font-medium">Force</p>
                <p className="text-xs text-gray-600">
                  Runs the{" "}
                  <span className="text-purple-500 font-medium">
                    {" "}
                    git push --force
                  </span>{" "}
                  command{" "}
                </p>
              </div>
            </div>
            <div>
              <Switch
                onClick={() => {
                  setisForcePush(!isForcePush);
                }}
              />
            </div>
          </div>
          {/* slack end */}
          <div className="py-2 w-full   flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <div className="h-10 px-2 w-10 border rounded-md flex items-center justify-center">
                <SlackSVGIcon />
              </div>
              <div>
                <p className="text-sm tracking-tight font-medium">
                  Slack remainder
                </p>
                <p className="text-xs text-gray-600">
                  Slack channel will get notified{" "}
                </p>
              </div>
            </div>
            <div>
              <Switch
                onClick={() => {
                  setisSlackReminder(!isSlackReminder);
                }}
              />
            </div>
          </div>
          {/* slack end */}
          {/* slack end */}
          <div className="py-2 w-full   flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <div className="h-10 px-2 w-10 border rounded-md flex items-center justify-center">
                <CalendarDateRangeIcon className="size-5" />
              </div>
              <div>
                <p className="text-sm tracking-tight font-medium">
                  Schedule Commit
                </p>
                <p className="text-xs text-gray-600">
                  Set the time you want to commit{" "}
                </p>
              </div>
            </div>
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <div className="">
                    <Switch />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0  mr-[500px] shadow-xl">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          {/* slack end */}

          <div className=" mt-6 w-full flex items-center gap-2 justify-end">
            <Button variant={"outline"}>
              <p className="text-sm font-light text-gray-800 font-Poppins">
                Cancel
              </p>
            </Button>
            <Button className="bg-purple-500 hover:bg-purple-700">
              <p className="text-sm font-light font-Poppins">Schedule</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModalContent;

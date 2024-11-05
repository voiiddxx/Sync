import {
  BoltIcon,
  CalendarDateRangeIcon,
  ClockIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/solid";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { GitBranch, LoaderIcon } from "lucide-react";
import React, { useState } from "react";

import { SlackSVGIcon } from "./sideBar";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { updateUserRepo } from "@/store/slices/repoSlice";
import moment from "moment-timezone";

const ScheduleModalContent = ({ data, closeModal }: any) => {
  const user = useSelector((state: any) => state.user.value);
  const { toast } = useToast();

  const [date, setDate] = useState<Date>();
  const [commit_message, setcommit_message] = useState<string>("");
  const [isForcePush, setisForcePush] = useState<boolean>(false);
  const [isSlackReminder, setisSlackReminder] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isScheduling, setisScheduling] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleCommitSubmission = async () => {
    const istTime = moment.tz(date, "Asia/Kolkata");
    const utcTime = istTime.utc(); // Convert to UTC

    try {
      if (commit_message == "") {
        toast({
          description: "Commit message is required",
          variant: "destructive",
        });
        closeModal();
        return;
      }

      setisLoading(true);
      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_URL}/api/commit/request`,
        {
          username: user.username,
          message: commit_message,
          time: utcTime.toISOString(),
          isSlack: isSlackReminder,
          isForce: isForcePush,
          commitId: data.id,
        }
      );
      if (res.status !== 200) {
        setisLoading(false);
        console.log("Some error occured");
        toast({
          description: "Some Error Occured!",
        });
        closeModal();
      }
      dispatch(updateUserRepo(res.data.data));
      toast({
        description: "Commit has been successfully scheduled!",
      });
      closeModal();
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      console.log(error);
      closeModal();
    }
  };

  return (
    <div className=" w-full font-Poppins min-h-48 relative">
      <div className="">
        <div className=" w-full border-b border-zinc-700 px-4 py-4 bg-[#161616] rounded-t-lg flex items-start gap-2">
          <GitHubLogoIcon className="size-5 text-white mt-1" />
          <div>
            <p className=" tracking-tight text-white/90">Schedule commit</p>
            <p className="text-xs  text-white/60  tracking-tight">
              Want to commit later? schedule now
            </p>
          </div>
        </div>

        <div className="px-5 mt-6 pb-6">
          <p className="text-sm text-white/60">Commit message</p>

          <div className="flex border rounded-lg w-full h-10 mt-2 border-zinc-700 ">
            <div className="w-12 flex items-center justify-center h-full border-r border-zinc-700">
              <BoltIcon className="size-4 text-purple-300" />
            </div>

            <input
              onChange={(event) => {
                setcommit_message(event.target.value);
              }}
              type="text"
              className="border-none mr-1 bg-transparent text-white outline-none w-full h-full text-xs focus:border-none focus:outline-none px-2"
              placeholder="Enter your commit message"
            />
          </div>

          <div className="flex flex-col mt-6">
            <div className="px-2 py-1 border border-zinc-600 w-fit flex items-center gap-1 rounded-full bg-[#262626]">
              <GitBranch size={15} strokeWidth={1.25} className="text-white/80" />
              <p className="text-[13px] tracking-tight text-xs font-light text-white/60 ">
                github/voiiddxx/flow-cli/commits
              </p>
            </div>
          </div>

          {/* slack */}
          <div className="py-2 w-full   flex items-center justify-between mt-6">
            <div className="flex items-center gap-2">
              <div className="h-10 px-2 w-10 border border-zinc-700 rounded-md flex items-center justify-center">
                <RocketLaunchIcon className="size-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm tracking-tight font-normal text-white/90">Force</p>
                <p className="text-xs text-gray-400">
                  Runs the{" "}
                  <span className="text-purple-400 font-medium">
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
              <div className="h-10 px-2 w-10 border rounded-md flex items-center justify-center border-zinc-700">
                <SlackSVGIcon />
              </div>
              <div>
                <p className="text-sm tracking-tight font-normal text-white/90">
                  Slack remainder
                </p>
                <p className="text-xs text-gray-400">
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
              <div className="h-10 px-2 w-10 border rounded-md flex items-center justify-center border-zinc-700 ">
                <CalendarDateRangeIcon className="size-5 text-white" />
              </div>
              <div>
                <p className="text-sm tracking-tight font-medium text-white/90">
                  Schedule Commit
                </p>
                <p className="text-xs text-gray-400">
                  Set the time you want to commit{" "}
                </p>
              </div>
            </div>
            <div>
              <div
                onClick={() => {
                  setisScheduling(!isScheduling);
                }}
                className=""
              >
                <Switch />
              </div>
            </div>
          </div>
          {/* slack end */}

          {isScheduling && (
            <div className="py-2 w-full   flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <div className="h-10 px-2 w-10 border rounded-md flex items-center justify-center">
                  <ClockIcon className="size-5 text-white/60" />
                </div>
                <div>
                  <p className="text-sm tracking-tight font-medium text-white/90">
                    Date & Time
                  </p>
                  <p className="text-xs text-gray-400 font-normal">
                    Select date and time for commit{" "}
                  </p>
                </div>
              </div>
              <input
                onChange={(event) => {
                  const newData = new Date(event.target.value);
                  setDate(newData);
                }}
                className="p-2 text-xs text-white/60  border border-zinc-700 rounded-lg bg-[#343434] focus:outline-none  focus:bg-blue-50 transition duration-300 accent-blue-500"
                type="datetime-local"
                defaultValue="2024-06-01T09:00"
              />
            </div>
          )}
          <div className=" mt-6 w-full flex items-center gap-2 justify-end">
            
            <Button
              onClick={handleCommitSubmission}
              className="bg-[#ff5e07] hover:bg-[#262626]"
            >
              {isLoading ? (
                <div className=" w-full flex items-center justify-center">
                  <LoaderIcon className="animate-spin" strokeWidth={2} />
                </div>
              ) : (
                <p className="text-xs font-normal font-Poppins">Schedule</p>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModalContent;

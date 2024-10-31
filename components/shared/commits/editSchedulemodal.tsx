import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Calendar, GitBranch, FileText, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import {
  CalendarDateRangeIcon,
  ClockIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/solid";
import { SlackSVGIcon } from "../dashboard/sideBar";

import GradientButton from "../gradient-button";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { updateUserRepo } from "@/store/slices/repoSlice";

export default function EditScheduleModal({ data, closeModal }: any) {
  const [commitMessage, setCommitMessage] = useState(data.commit_message);
  const [isSlackReminder, setisSlackReminder] = useState<boolean>(
    data?.isSlack
  );
  const [forceGit, setForceGit] = useState(data?.isForce);
  const user = useSelector((state: any) => state.user.value);
  const [date, setDate] = useState<Date | null>(data?.scheduled_time || null);
  const [isLoading, setisLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const dispatch = useDispatch();

  const updateCommitOrReschedule = async () => {
    setisLoading(true);

    const updateData = {
      commit_message: commitMessage,
      isForce: forceGit,
      scheduled_time: date,
      isSlack: isSlackReminder,
    };

    const response = await axios.post("/api/commit/update", {
      data: updateData,
      username: user?.username,
      commitId: data?.id,
    });

    if (response.status === 200) {
      toast({
        description: "Commit Updated Successfully",
      });
      setisLoading(false);

      dispatch(updateUserRepo(response.data.data));

      closeModal();
    } else {
      toast({
        description: "Failed to Update Commit",
        variant: "destructive",
      });
      setisLoading(false);
      closeModal();
    }
    setisLoading(false);
  };

  return (
    <Card className="w-[600px] max-w-4xl mx-auto bg-white shadow-lg border border-gray-200 font-Poppins">
      <CardHeader className="space-y-1 border-b rounded-t-lg  pb-4 bg-zinc-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <CardTitle className=" font-semibold text-gray-800">
              Schedule Commit
            </CardTitle>
          </div>
          <Badge
            variant="outline"
            className="text-green-600 font-Poppins text-xs font-normal  border-green-300"
          >
            Scheduled
          </Badge>
        </div>
        <p className="text-xs  text-gray-500 tracking-tight">
          Plan your code changes for future deployment
        </p>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <GitBranch className="h-4 w-4" />
            <span className="text-sm font-medium">{data.repo}</span>
          </div>
          <Separator orientation="vertical" className="h-4" />
          <div className="flex items-center space-x-2">
            <Avatar className="h-5 w-5">
              <AvatarImage src={`${user.github_avatar_url}`} />
              <AvatarFallback>VD</AvatarFallback>
            </Avatar>
            <span className="text-xs">Created by voiiddxx 2 days ago</span>
          </div>
        </div>
        <div className="space-y-2">
          <Label
            htmlFor="commit-message"
            className="text-xs font-medium text-gray-700"
          >
            Commit Message
          </Label>
          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-gray-500" />
            <Input
              value={commitMessage}
              onChange={(e) => setCommitMessage(e.target.value)}
            />
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
              checked={forceGit === true ? true : false}
              onClick={() => {
                setForceGit(!forceGit);
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
              checked={isSlackReminder === true ? true : false}
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
            <Switch checked={Date !== null ? true : false} />
          </div>
        </div>
        {/* slack end */}

        {date && (
          <div className="py-2 w-full   flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              <div className="h-10 px-2 w-10 border rounded-md flex items-center justify-center">
                <ClockIcon className="size-5" />
              </div>
              <div>
                <p className="text-sm tracking-tight font-medium">
                  Date & Time
                </p>
                <p className="text-xs text-gray-600">
                  Select date and time for commit{" "}
                </p>
              </div>
            </div>
            <input
              onChange={(event) => {
                const newData = new Date(event.target.value);
                setDate(newData);
              }}
              className="p-2 text-xs text-black  border rounded-lg bg-white focus:outline-none  focus:bg-blue-50 transition duration-300 accent-blue-500"
              type="datetime-local"
              defaultValue={date.toString().slice(0, 16) || "2024-06-01T09:00"}
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end space-x-2 border-t border-gray-200 pt-4">
        <GradientButton
          onClick={updateCommitOrReschedule}
          isLoading={isLoading}
          title={"Update Commit"}
        />
      </CardFooter>
    </Card>
  );
}

import { ClockIcon } from "lucide-react";
import React, { useState, useEffect } from "react";

export const ScheduledCommitCountdown = ({
  scheduledTime,
}: {
  scheduledTime: string;
}) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const scheduled = new Date(scheduledTime);
      const diff = scheduled.getTime() - now.getTime();

      console.log("this is the diff time we get", diff);

      if (diff <= 0) {
        setTimeLeft("00:00:00");
        return;
      }

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(
        `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    };

    calculateTimeLeft(); // Initial calculation
    const timer = setInterval(calculateTimeLeft, 1000); // Update every second

    return () => clearInterval(timer); // Cleanup on unmount
  }, [scheduledTime]);

  return (
    <div className="flex items-center gap-2">
      <ClockIcon className="size-4 text-[#522fff]" />
      <p className="text-xs ml-1 font-normal text-white/60">
        Scheduled in <span className="text-white text-sm">{timeLeft}</span>
      </p>
    </div>
  );
};

"use client";

import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MainPage = () => {
  const { toast } = useToast();
  const user = useSelector((state: any) => state.user.value);
  const repo = useSelector((state: any) => state.repo.value);
  const [pr, setpr] = useState<any>([]);

  const getMerge = async () => {

    console.log("func called");
    
    try {
      const bodyParameter = {
        username: user?.username,
        repo: repo?.name,
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/api/merge`,
        bodyParameter
      );
      if (response.status !== 200) {
        toast({
          description: "Error while merging pull requests",
          variant: "destructive",
        });
        return;
      }
      setpr(response.data);
    } catch (error) {
      console.log(error);
      toast({
        description: "Error while fetching pull requests",
        variant: "destructive",
      });
    }
  };


  useEffect(()=>{
    getMerge();
  } , [])
  return <div>this is the main page for the pull requlests</div>;
};

export default MainPage;

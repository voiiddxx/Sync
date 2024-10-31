"use client";
import LandingPage from "@/components/shared/landingPage/landingPage";
import { updateUserValue } from "@/store/slices/user";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const dispatch = useDispatch();
  const user = useSelector((state:any)=>state.user.value)
  console.log("this is user" , user);
  

  const getUserdata = async (username: string) => {
    try {
      if (username) {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_UR}/api/user?username=${username}`
        );
  
        if (res.status !== 200 || !res.data.data) {
          console.log("No user found");
          return;
        }
  
        console.log("Data received:", res.data.data);
        // Ensure that the response data is an object
        if (typeof res.data.data !== 'object' || res.data.data === null) {
          throw new Error("Invalid user data received");
        }


        // Dispatch the user data
        dispatch(updateUserValue(res.data.data));
        console.log("User stored");
      }
    } catch (error) {
      console.log("No Data found", error);
    }
  };
  

  useEffect(() => {
    if (username) {
      getUserdata(username!);
    }
  }, [username]);

  return <LandingPage />;
}

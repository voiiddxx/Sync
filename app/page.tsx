'use client'
import LandingPage from "@/components/shared/landingPage/landingPage";
import { updateUser } from "@/store/slices/user";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {

const searchParams = useSearchParams();
const username = searchParams.get('username');
const dispatch = useDispatch();


const getUserdata = async (username : string)=>{
    try {
      if(username){
        const res = await axios.get(`http://localhost:3000/api/user?username=voiiddxx` , );
        if(res.status!=200){
          // show popup for nu user found
          return;
        }
        dispatch(updateUser(res.data.data));
      }
    } catch (error) {
      console.log("No Data found");
      // show popup
      
    }
} 

useEffect(()=>{
  if(username){
    getUserdata(username!);
  }
} , [username])


  return (
    <LandingPage/>
  )
}


import { SlackSVGIcon } from '@/components/shared/dashboard/sideBar';
import { BellAlertIcon } from '@heroicons/react/24/solid';
import { GitBranch, Github, Rabbit } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const DynamicIsland = ({user} : any) => {

    const [showDynamic, setshowDynamic] = useState<number>(0);
    const [isAnimating, setisAnimating] = useState<boolean>(false)
    const repo = useSelector((state:any)=>state.repo.value)


  return (
    <div
    onClick={() => {
      setshowDynamic(showDynamic === 0 ? 1 : showDynamic === 1 ? 2 : 0);
      setisAnimating(true)
      setTimeout(() => {
          setisAnimating(false);
      }, 300);
    }}
    className={` h-10 transition-all shadow-xl ease-in-out duration-500 ${
      showDynamic === 0 ? "w-14" : showDynamic === 1 ? "w-40" : "w-[450px]"
    } cursor-pointer bg-zinc-900 rounded-full shadow-lg ${isAnimating ? 'animate-stretch' : ''} `}
  >

      {
        showDynamic === 0 && (
          <div className="w-full h-full flex items-center justify-center" >
            <Rabbit size={20} strokeWidth={1.25} className="text-white" />
          </div>
        )
      }

    {showDynamic === 1 && (
      <div className={` w-full h-full  flex items-center justify-between px-4 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        <div>
          <Github size={15} className={`text-white transition-all  ${isAnimating && 'animate-bounce duration-200'}`} />
        </div>
        <p className={`text-white text-xs  `}>{user?.username || 'voiiddxx'}</p>
      </div>
    )}

    {showDynamic === 2 && (
      <div className=" w-full h-full px-4 flex  justify-between items-center">
        <div className={`flex items-center gap-2 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          <div className=" h-4 w-4 rounded-full bg-white">
            <Image
              className="rounded-full shadow-xl"
              src={`${user?.github_avatar_url || 'https://avatars.githubusercontent.com/u/95859137?v=4'}`}
              height={1500}
              width={1500}
              alt="image"
            />
          </div>
          <p className={`text-white text-xs font-Poppins transition-opacity duration-1000 ${showDynamic == 2 ? 'opacity-100' : 'opacity-10'} tracking-tight`} >voiiddxx/floww</p>
        </div>
        <div className={`flex items-center gap-2 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          <GitBranch className="text-white" size={15} strokeWidth={1.25} />
          <p className="text-white text-xs font-Poppins tracking-tight" >main</p>
        </div>
        <div className={`flex items-center gap-2 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          <BellAlertIcon className="text-white size-4"  />
          <p className="text-white text-xs font-Poppins tracking-tight" >2 New</p>
        </div>
        <div className={`flex items-center gap-2 transition-opacity duration-300 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        <div className="h-7 w-7 shadow-md rounded-md flex items-center justify-center overflow-hidden p-1">
          <SlackSVGIcon />
        </div>
          <p className="text-white text-xs font-Poppins tracking-tight" >Connected</p>
        </div>
  
     
      </div>
    )}
  </div>
  )
}

export default DynamicIsland
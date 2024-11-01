'use client'
import { updateDarkMode } from '@/store/slices/windowSlice'
import { Rabbit } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const NavBar = () => {

    const dispatch = useDispatch();
    const darkMode = useSelector((state:any)=>state.window.darkMode)
  return (
    <div className=' w-full bg-white h-16 dark:bg-zinc-900   px-32 flex items-center justify-between border-b dark:border-zinc-600  border-zinc-100 dark:text-white' >
        {/* logo section */}
        <div className='flex gap-1 items-center' >
           
          <Image className="h-8 w-8 " src={'/logo.png'} height={1500} width={1500} alt="logo" />
            <p className='text-lg font-Poppins  font-semibold' >Floww</p>
        </div>

        {/* option section */}
        <div className=' flex gap-12 font-Poppins' >
            <p className='text-sm font-medium cursor-pointer hover:text-indigo-700' >Documentation</p>
            <p className='text-sm font-medium cursor-pointer hover:text-indigo-700' >Pricing</p>
            <p className='text-sm font-medium cursor-pointer hover:text-indigo-700' >Support</p>
            <p className='text-sm font-medium cursor-pointer hover:text-indigo-700' >Community</p>
            <p onClick={()=>{
              dispatch(updateDarkMode(!darkMode))
            }} className='text-sm font-medium cursor-pointer hover:text-indigo-700' >Dark Mode</p>
        </div>
    {/* login button section */}
    <div className=' flex gap-2 items-center' >
        <div className=' h-8 px-3 rounded-lg cursor-pointer border border-zinc-300 flex items-center justify-center' >
            <p className='text-sm' >Signin</p>
        </div>
        <div className=' h-8 px-3 rounded-lg cursor-pointer border bg-zinc-900 text-white flex items-center justify-center' >
            <p className='text-sm' >Signup</p>
        </div>
    </div>
    </div>
  )
}

export default NavBar
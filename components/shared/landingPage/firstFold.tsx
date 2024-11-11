import { GlobeDemo } from '@/components/ui/GitGlobe';
import { ChevronRight } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const FirstFold = () => {


  const GITHUB_AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URL}&scope=repo,workflow,admin:repo_hook,user`;

  return (
    < >
    <div className='' >
    <div className='h-[90vh] w-full flex flex-col justify-center items-center gap-2 dark:bg-[#050505] dark:text-white' >
      <div className=' bg-zinc-100 px-1 py-1 rounded-full flex items-center group justify-center md:mt-20  cursor-pointer' >
        <div className='bg-zinc-600 text-white rounded-full px-2' >
          <p className='text-sm' >New</p>
        </div>
      <p className='text-sm text-zinc-700 font-medium ml-2' > PR Scheduler on the way of launch 🎉</p>
      <div>
        <ChevronRight className='group-hover:scale-125 transition-all'  strokeWidth={1.25} size={16} />
      </div>
      </div>

    <div className='px-36' >
    <p className='text-[100px] text-center font-sans text-[#1C1D1F] dark:text-white tracking-[-3.6px]' >Automate</p>
    <p className='text-[100px] text-center font-sans text-[#1C1D1F] -mt-14 dark:text-white tracking-[-3.6px]' >your workflows</p>
    <p className='text-[22px]  font-Poppins  text-zinc-700 dark:text-zinc-500 text-center ' >No more late-night commits or missed PR deadlines! Our platform <br />lets you schedule GitHub commits, pull requests 
    </p>

    <div className=' flex gap-2 z-50 w-full items-center justify-center mt-8' >
     <Link href={GITHUB_AUTH_URL}>
     <div className='px-6 py-3 rounded-xl flex items-center justify-center bg-gradient-to-b from-zinc-800 shadow-lg to-zinc-700 text-white cursor-pointer' >
      <p className='font-mono font-medium' >Sign in with github</p>
      </div></Link>
      <div className='px-6 py-3 rounded-xl flex items-center justify-center border border-zinc-400 text-zinc-800 cursor-pointer' >
      <p className='font-mono font-semibold' >Star on github</p>
      </div>
    </div>
    {/* <Image className='' src={`/nodata.png`} height={1500} width={1500} alt='image'/> */}
    </div>
    </div>
    <div className='z-20 mt-52' >
    {/* <GlobeDemo/> */}
    </div>

    </div>
    </>
  )
}

export default FirstFold
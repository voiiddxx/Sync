import { Loader, TriangleAlert } from 'lucide-react'
import React, { useState } from 'react'

const DeleteModalComponent = () => {

    const [isLoading, setisLoading] = useState<boolean>(false);

    const [isMatch, setisMatch] = useState(false);

    const onChangeHandle = (event:any)=>{
        if(event.target.value === 'abcd'){
            setisMatch(true);
        }else{
            setisMatch(false);
        }
    }

  return (
    <div className='min-h-24 w-full flex flex-col pb-3' >
        <div className='h-16 w-full border-b rounded-t-lg flex flex-col justify-center px-4 bg-zinc-100' >
            <p className='text-base text-gray-800 font-Poppins font-medium' >Delete commit</p>
        </div>

        <div className='px-4 mt-4' >
        <p className=' text-sm text-gray-800 font-Poppins tracking-tight font-medium' >Are you sure you want to delete the commit?</p>

        <p className='mt-6 text-xs font-medium font-Poppins text-gray-700' >commit id </p>
        <input onChange={onChangeHandle} className='outline-none h-8 w-full border shadow-sm rounded-lg mt-2 text-xs text-black font-Poppins px-2' placeholder='write your commit id' type="text" />
        </div>

        <div className=' min-h-12 w-full mt-4 bg-gradient-to-b from-red-50  to-white' >
            <div className='w-full flex items-start gap-2 px-4 mt-4' >
                <div>
                <TriangleAlert size={18} className='text-red-500 mt-1' />
                </div>
                <p className='text-xs text-red-400 font-Poppins' >This action will delete the application and all associated instances and data, and is irreversible.</p>
            </div>

            <div className=' w-full flex items-center justify-end px-4 mt-6' >
            <div
        //   onClick={hanldeUpdation}
          className={`relative px-4 shadow-sm py-2 rounded-lg bg-gradient-to-b from-red-700  to-red-400 flex items-center justify-center 
    transition-transform duration-300 ease-in-out cursor-pointer hover:scale-105 hover:from-red-600 hover:to-red-400 ${isMatch ? "opacity-100" : 'opacity-50'}`}
        >
          <p
            className={`text-xs text-white transition-opacity duration-500 font-Poppins ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
          >
            Update commit
          </p>
          <Loader
            className={`absolute animate-spin text-white w-5 h-5 transition-opacity duration-1000 ${
              isLoading ? "opacity-100 " : "opacity-0"
            }`}
          />
        </div>
            </div>

        </div>
        
    </div>
  )
}

export default DeleteModalComponent
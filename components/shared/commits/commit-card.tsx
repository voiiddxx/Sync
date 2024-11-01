import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { MoreHorizontal, GitCommit, GitBranch, FileText, FilePlus, FileEdit, Check, ChevronRight } from "lucide-react"
import CustomModal from "../modal"
import { AdjustmentsHorizontalIcon, CalendarDateRangeIcon, DocumentArrowDownIcon, PencilSquareIcon } from "@heroicons/react/24/solid"
import ScheduleModalContent from "../dashboard/schedule-modal"
import EditCommit from "../modals/editCommit"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function CommitCard({data , user} : any) {

    
  return (
    <Card className="w-[385px] max-h-[250px]  bg-white border flex flex-col justify-between border-gray-200 shadow-sm font-Poppins ">
   <div>
   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <div className="flex items-center space-x-2">
        <svg viewBox="0 0 16 16" className="w-5 h-5 text-gray-700" fill="currentColor">
          <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
        </svg>
        <h2 className="text-sm font-medium text-gray-700">voiiddxx/{data?.repo}</h2>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-xs font-medium text-gray-500">a1b2c3d</span>
        <Popover>
           <PopoverTrigger asChild>
             <Button variant="ghost" className="h-8 w-8 p-0">
               <MoreHorizontal className="h-4 w-4" />
               <span className="sr-only">More options</span>
             </Button>
           </PopoverTrigger>
           <PopoverContent className="w-60">
            <div className=" flex flex-col w-full h-full">
              <div className=" h-10 rounded-t-xl px-4 bg-zinc-50 w-full flex items-center justify-start border-b ">
                <AdjustmentsHorizontalIcon className="size-4" />
                <p className="text-sm font-Poppins px-2">Manage</p>
              </div>

              <div className="pt-2 flex flex-col gap-2 mt-2 pb-3 text-gray-950 px-2">

              <CustomModal
                prevItem={
                 <div className=" w-full transition-all duration-300 ease-in-out flex justify-between items-center hover:bg-purple-100 rounded-lg px-2 text-gray-700  hover:text-purple-700 " > <div className="w-full  flex items-center gap-2  py-2  cursor-pointer hover:rounded-md">
                 <PencilSquareIcon className="size-5 " />
                 <p className="text-[13px] font-Poppins tracking-tight">
                   Update commit
                 </p>
               </div>
               <ChevronRight size={20} strokeWidth={1.5}/>
               </div>
                }
                modalContent={(closeModal: any) => (
                  <EditCommit data={data} closeModal={closeModal} />
                )}
              />

              <CustomModal
                prevItem={
                  <div className=" w-full flex items-center text-gray-700 hover:text-purple-700 justify-between px-2 hover:bg-purple-100 rounded-lg transition-all duration-300 ease-in-out" ><div className=" w-full items flex items-center gap-2  py-2  cursor-pointer hover:rounded-md">
                  <CalendarDateRangeIcon className="size-5 " />
                  <p className="text-[13px] font-Poppins ">
                    Schedule commit
                  </p>
                </div>
                <ChevronRight size={20} strokeWidth={1.5} className="text-gray-700" /></div>
                }
                modalContent={(closeModal: any) => (
                  <ScheduleModalContent
                    data={data}
                    closeModal={closeModal}
                  />
                )}
              />
            </div>
          </div>
        </PopoverContent>
        </Popover>
      </div>
    </CardHeader>
    <CardContent className="pt-1  pb-4">
      <div className="flex items-start space-x-3">
        <Avatar className="h-8 w-8">
          <AvatarImage src={`${user.github_avatar_url}/?height=32&width=32`} alt="@voiddxx" />
          <AvatarFallback>Flow</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-900">{user?.username}</p>
          <p className="text-sm text-gray-700 line-clamp-1">{data.commit_message || 'No Message'} </p>
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <span>2 minutes ago</span>
            <span>•</span>
            <div className="flex items-center">
              <GitBranch className="h-3 w-3 mr-1" />
              <span>{data.branch}</span>
            </div>
            <span>•</span>
            <div className="flex items-center space-x-1">
              <div className="flex items-center">
                <DocumentArrowDownIcon className="h-3 w-3 mr-1 text-gray-500" />
                <span>
                   file changes
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
   </div>
    <CardFooter className="flex justify-between mt-6 items-center pt-2 pb-2 px-6 bg-gray-50 border-t rounded-b-xl">
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span className="text-xs font-medium text-gray-600">Status: {data.status}</span>
      </div>
      <Button variant="outline" size="sm" className="text-xs">
        View on GitHub
      </Button>
    </CardFooter>
  </Card>
   
  )
}
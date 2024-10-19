import SideBar from "@/components/shared/dashboard/sideBar";
import TopBar from "@/components/shared/dashboard/topBar";


export default function DashboardLayout ({children} : any){
    return (
        <div className="w-full h-screen flex" >
            {/* left div */}
            <SideBar/>
            {/* righr div */}
            <div className=" h-screen w-full">
                {/* upper bar */}
                <div className="h-[60px] w-full border-b" >
                <TopBar/>
                {children}
                </div>
            </div>
        </div>
    )
    
}
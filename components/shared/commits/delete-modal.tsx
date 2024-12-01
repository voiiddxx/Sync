import { useToast } from "@/hooks/use-toast";
import { updateUserRepo } from "@/store/slices/repoSlice";
import axios from "axios";
import { Loader, TriangleAlert } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const DeleteModalComponent = ({ data, closeModal }: any) => {
  const user = useSelector((state: any) => state.user.value);
  const { toast } = useToast();
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [isMatch, setisMatch] = useState(false);
  const dispatch = useDispatch();



  

  const onChangeHandle = (event: any) => {
    if (event.target.value === "abcd") {
      setisMatch(true);
    } else {
      setisMatch(false);
    }
  };

  const hanldleDeleteSubmission = async () => {
    setisLoading(true);
    if (!isMatch) {
      toast({
        description: "Commit Id doesn't match",
        variant: "destructive",
      });
      return;
    }

    const jsonData = {
      userId: user?.id,
      commitId: data.id,
      username: user?.username,
    };

    const res = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/commit/delete`, jsonData);
    if (res.status !== 200) {
      toast({
        description: "Failed to delete commit",
        variant: "destructive",
      });
      setisLoading(false);
      return;
    }
    toast({
      description: "Commit deleted successfully",
    });
    dispatch(updateUserRepo(res.data.data));
    setisLoading(false);
    closeModal();
  };

  return (
    <div className="min-h-24 w-full flex flex-col pb-3m">
      <div className="h-16 w-full border-b border-b-zinc-700 rounded-t-lg flex flex-col justify-center px-4 ">
        <p className=" text-white/90 font-Poppins  text-sm tracking-tight">
          Delete commit 
        </p>
      </div>

      <div className="px-4 mt-4">
        <p className=" text-xs text-white/50 font-Poppins tracking-tight font-light">
          Are you sure you want to delete the commit?
        </p>

        <p className="mt-6 text-xs font-light font-Poppins text-white/30">
          commit id{" "}
        </p>
        <input
          onChange={onChangeHandle}
          className="outline-none h-8 w-full border shadow-sm bg-transparent rounded-lg mt-2 text-xs border-white/20 text-white font-Poppins px-2 "
          placeholder="write your commit id"
          type="text"
        />
      </div>

      <div className=" min-h-12 w-full mt-4 ">
        <div className="w-full flex items-start gap-2 px-4 mt-4">
          <div>
            <TriangleAlert size={18} className="text-red-400 mt-1" />
          </div>
          <p className="text-xs text-[#ff9f9f] font-Poppins">
            This action will delete the application and all associated instances
            and data, and is irreversible.
          </p>
        </div>

        <div className=" w-full flex items-center justify-end px-4 mt-6">
          <div
              onClick={hanldleDeleteSubmission}
            className={`relative px-4 shadow-sm py-2 rounded-lg bg-gradient-to-b from-red-600  to-red-800 flex items-center justify-center 
    transition-transform duration-300 ease-in-out cursor-pointer hover:scale-105 hover:from-red-600 hover:to-red-500 ${
      isMatch ? "opacity-100" : "opacity-50"
    }`}
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
  );
};

export default DeleteModalComponent;

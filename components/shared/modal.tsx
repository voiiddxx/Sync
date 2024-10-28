import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

const CustomModal = ({ prevItem, modalContent  }: any) => {

  const [open, setOpen] = useState<any>(false);

  const closeModal = () => setOpen(false);
  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger>
      <div onClick={() => setOpen(true)}>{prevItem}</div></DialogTrigger>
      <DialogContent>{modalContent(closeModal)}</DialogContent>
    </Dialog>
  );
};

export default CustomModal;

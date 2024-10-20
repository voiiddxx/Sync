import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CustomModal = ({ prevItem, modalContent }: any) => {
  return (
    <Dialog>
      <DialogTrigger>{prevItem}</DialogTrigger>
      <DialogContent>
        {modalContent}
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;

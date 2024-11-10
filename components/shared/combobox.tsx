"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";

const ComboBox = ({ data, onChange, icon , prevItem }: any) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-1 ml-1" >
          <p className="text-white text-[13px] font-Poppins text-white/80" >{value || 'Select'}</p>
          <ChevronUpDownIcon className="text-white size-4" />
          </div>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0 ">
        <Command className="bg-[#262626] border-none" >
          <CommandInput className="" placeholder="Search..." />
          <CommandList className="" >
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup className="bg-[#272727] text-white/40 font-Poppins font-light" >
              {data.map((framework: any) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    onChange(framework);
                  }}
                >
                  <div className="mr-2">{icon}</div>
                  <p className="font-Poppins tracking-tight">
                    {framework.label}
                  </p>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ComboBox;

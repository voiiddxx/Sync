"use client";

import * as React from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const ComboBox = ({ data, onChange, icon, prevItem }: any) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="flex items-center gap-1 ml-1">
          <p className="text-white text-[13px] font-Poppins text-white/80">
            {value || "Select"}
          </p>
          <ChevronUpDownIcon className="text-white size-4" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0 ">
        <Command className="bg-[#1c1c1c] border-none">
          <CommandInput className="" placeholder="Search..." />
          <CommandList className="">
            <CommandEmpty>
              <div className=" w-full h-full flex flex-col items-center justify-center">
                <GitHubLogoIcon className="size-5 text-white" />
                <p className="text-sm font-Poppins text-white/70 mt-3 font-light">
                  No Repo found
                </p>
                <p className="text-xs text-white/50 font-Poppins font-light tracking-wide mt-1">
                  All your github repository will show here
                </p>
              </div>
            </CommandEmpty>
            <CommandGroup className="bg-[#1a1a1a] text-white/90 font-Poppins font-light">
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
                  <p className="font-Poppins tracking-wide font-light text-xs">
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

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

const ComboBox = ({ data, onChange, icon }: any) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] flex justify-between dark:text-white/70 dark:bg-white/10"
        >
          <div className="flex items-center gap-2">
            {icon}
            {value || "Select Repo"}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
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

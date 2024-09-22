"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

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
import { cn } from "@/utils";

export interface ComboboxProps<T> {
  data?: {
    value: string;
    label: string;
  }[];
  placeholder?: string;
  emptyMessage?: string;
  onChange?: (value: T) => void;
  value?: T;
  className?: string;
}

export function Combobox<T>({
  data = [],
  placeholder = "Selecione...",
  emptyMessage = "Nenhum item encontrado",
  onChange = () => {},
  value,
  className,
}: ComboboxProps<T>) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[200px] justify-between", className)}
        >
          <span className="text-ellipsis overflow-hidden whitespace-nowrap">
            {Array.isArray(value) && value.length > 0
              ? value
                  .map(
                    (item) =>
                      data.find((dataItem) => dataItem.value === item)?.label
                  )
                  .join(", ")
              : data.find((item) => item.value === value)?.label ?? placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={cn("w-[200px] p-0", className)}>
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {data.map((item) => (
                <CommandItem
                  className="cursor-pointer"
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    setOpen(false);
                    if (Array.isArray(value)) {
                      if (value.includes(currentValue)) {
                        const updatedValue = value.filter(
                          (value: T) => value !== currentValue
                        );
                        onChange(updatedValue as T);
                      } else {
                        onChange([...value, currentValue] as T);
                      }
                    } else {
                      onChange(
                        currentValue === value ? ("" as T) : (currentValue as T)
                      );
                    }
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      Array.isArray(value)
                        ? value.includes(item.value)
                          ? "opacity-100"
                          : "opacity-0"
                        : value === item.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {item.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

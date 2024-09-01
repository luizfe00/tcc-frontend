import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export interface DropdownProps {
  data: {
    value: string;
    label: string;
  }[];
  trigger: React.ReactNode;
  placeholder?: string;
  emptyMessage?: string;
  onChange?: (value: string) => void;
}

export const Dropdown = ({
  data,
  trigger,
  placeholder,
  onChange,
}: DropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{placeholder}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {data.map((item) => (
          <DropdownMenuItem
            onClick={() => onChange?.(item.value)}
            key={item.value}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

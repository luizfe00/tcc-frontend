import { cn } from "@/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar, CalendarProps } from "../ui/calendar";
import { SelectSingleEventHandler } from "react-day-picker";

export interface DatePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  selected: Date | undefined;
  onSelect: SelectSingleEventHandler;
  datePickerProps?: CalendarProps;
}

export const DatePicker = ({
  className,
  selected,
  onSelect,
  datePickerProps,
}: DatePickerProps) => {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "grow justify-start text-left font-normal",
              !selected && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selected ? (
              format(selected, "dd/MM/yyyy")
            ) : (
              <span>Escolha uma data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            {...datePickerProps}
            mode="single"
            initialFocus
            selected={selected}
            onSelect={onSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

import { cn } from "@/utils";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar, CalendarProps } from "../ui/calendar";

export interface DateRangePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  selected: DateRange | undefined;
  onSelect: SelectRangeEventHandler;
  datePickerProps?: CalendarProps;
}

export const DateRangePicker = ({
  className,
  selected,
  onSelect,
  datePickerProps,
}: DateRangePickerProps) => {
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
            {selected?.from ? (
              selected.to ? (
                <>
                  {format(selected.from, "dd/MM/yyyy")} -{" "}
                  {format(selected.to, "dd/MM/yyyy")}
                </>
              ) : (
                format(selected.from, "dd/MM/yyyy")
              )
            ) : (
              <span>Escolha uma data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            {...datePickerProps}
            initialFocus
            mode="range"
            defaultMonth={selected?.from}
            selected={selected}
            numberOfMonths={2}
            onSelect={onSelect}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

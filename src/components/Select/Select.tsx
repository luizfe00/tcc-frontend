import {
  Select as SelectComponent,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface SelectProps {
  data: {
    value: string;
    label: string;
  }[];
  placeholder?: string;
  onChange?: (value: string) => void;
  value?: string;
  trigger: React.ReactNode;
  triggerClassName?: string;
}
export function Select({
  data,
  placeholder,
  onChange = () => {},
  value,
  trigger,
  triggerClassName,
}: SelectProps) {
  return (
    <SelectComponent onValueChange={onChange} defaultValue={value}>
      <SelectTrigger className={triggerClassName}>
        {trigger ? trigger : <SelectValue placeholder={placeholder} />}
      </SelectTrigger>
      <SelectContent>
        {data.map((item) => (
          <SelectItem
            onClick={() => onChange(item.value)}
            key={item.value}
            value={item.value}
          >
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectComponent>
  );
}

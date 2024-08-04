import { Separator } from "@/components/ui/separator";
import { useMemo } from "react";

export interface ThemeContainerTitleProps {
  actions?: () => React.ReactElement[];
  label: string;
}

export const ThemeContainerTitle = ({
  label,
  actions,
}: ThemeContainerTitleProps) => {
  const validActions = useMemo(() => {
    if (actions) return actions();
    return [];
  }, [actions]);

  return (
    <div className="mb-2">
      <div className="h-8 flex items-center justify-between mb-1">
        <span className="text-lg font-medium tracking-wide text-gray-600">
          {label}
        </span>
        {validActions}
      </div>
      <Separator />
    </div>
  );
};

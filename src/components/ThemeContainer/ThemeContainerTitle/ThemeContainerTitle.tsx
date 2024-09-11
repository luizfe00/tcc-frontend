import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useUserStore } from "@/user/user.store";
import { PlusIcon } from "lucide-react";

export interface ThemeContainerTitleProps {
  onClickNewTheme?: () => void;
  label: string;
}

export const ThemeContainerTitle = ({
  label,
  onClickNewTheme,
}: ThemeContainerTitleProps) => {
  const userState = useUserStore((state) => state);

  const disabled =
    userState.themes.length > 0 && userState.user?.role === "STUDENT";

  const handleButtonClick = () => {
    if (disabled) {
      return;
    }

    onClickNewTheme?.();
  };

  return (
    <div className="mb-2">
      <div className="h-8 flex items-center justify-between mb-1">
        <span className="text-lg font-medium tracking-wide text-gray-600">
          {label}
        </span>
        {onClickNewTheme && (
          <Button
            key="add-theme"
            variant={"outline"}
            size={"icon"}
            className="rounded-full h-8 w-8"
            onClick={handleButtonClick}
            disabled={disabled}
            title={disabled ? "Você já possui um tema" : ""}
          >
            <PlusIcon className="w-4" />
          </Button>
        )}
      </div>
      <Separator />
    </div>
  );
};

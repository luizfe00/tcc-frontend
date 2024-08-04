import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Theme } from "@/interfaces";
import { InterestList } from "../../InterestList/InterestList";

export interface ThemeDetailsProps {
  theme: Theme;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const ThemeDetails = ({
  theme,
  open,
  onOpenChange,
}: ThemeDetailsProps) => {
  const showNoInterestMessage = theme.interests.length === 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[680px]">
        <DialogHeader>
          <DialogTitle>{theme.label}</DialogTitle>
          <DialogDescription>{theme.summary}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-4">
          <div>
            <span className="text-sm font-medium text-gray-600">
              Interesses
            </span>
            <Separator />
          </div>
          {showNoInterestMessage ? (
            <span className="text-xs">
              Seu tema não possui nenhum interesse até o momento.
            </span>
          ) : (
            <InterestList interests={theme.interests} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

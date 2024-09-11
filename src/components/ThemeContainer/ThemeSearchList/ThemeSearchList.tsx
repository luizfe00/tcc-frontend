import PaginationContainer from "@/components/PaginationContainer/PaginationContainer";
import { Theme } from "@/interfaces";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ThemeCard } from "../ThemeCard/ThemeCard";

export interface ThemeSearchListProps {
  themes?: Theme[];
  orienteePaperThemeId?: string;
}

export const ThemeSearchList = ({
  themes,
  orienteePaperThemeId,
}: ThemeSearchListProps) => {
  return (
    <div className="flex flex-col h-full gap-y-2">
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-y-4">
          {themes?.map((theme) => (
            <ThemeCard
              key={theme.label + theme.ownerId}
              theme={theme}
              orienteePaperThemeId={orienteePaperThemeId}
            />
          ))}
        </div>
      </ScrollArea>
      <PaginationContainer />
    </div>
  );
};

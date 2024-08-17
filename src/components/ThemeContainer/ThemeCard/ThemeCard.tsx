import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Theme } from "@/interfaces";
import { getUserFirstName } from "@/utils/StringUtil";
import { useState } from "react";
import { ThemeDetailsDialog } from "../ThemeDetails/ThemeDetails";
import { cn } from "@/utils";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import { NewTheme } from "../NewTheme/NewTheme";

export interface ThemeCardProps {
  theme: Theme;
  owner?: boolean;
  onClick?: () => void;
  orienteePaperThemeId?: string;
}

export const ThemeCard = ({
  theme,
  owner = false,
  orienteePaperThemeId,
  onClick = () => {},
}: ThemeCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showThemeForm, setShowThemeForm] = useState(false);

  const handleShowDetails = () => {
    if (owner) {
      onClick();
      return;
    }

    setShowDetails(true);
  };

  const studentPaperTheme = orienteePaperThemeId === theme.id;

  const handleEditClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
    setShowThemeForm(true);
  };

  return (
    <>
      <Card
        className={cn(
          "p-4 shadow-sm cursor-pointer hover:-translate-y-1 hover:transition-transform",
          studentPaperTheme && "bg-stone-100"
        )}
        onClick={handleShowDetails}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span>{getUserFirstName(theme.owner.name)}</span>
            <Separator orientation="vertical" className="h-4" />
            <span className="font-semibold">{theme.label}</span>
          </div>
          {owner ? (
            <Button
              variant="outline"
              size="icon"
              className="p-1 w-8 h-8"
              onClick={handleEditClick}
            >
              <EditIcon className="w-4 h-4" />
            </Button>
          ) : (
            <></>
          )}
        </div>
        <Separator className="mb-2 mt-1" />
        <p className="text-sm text-gray-600 tracking-wide break-words">
          {theme.summary}
        </p>
      </Card>
      {showDetails && (
        <ThemeDetailsDialog
          open={showDetails}
          onOpenChange={setShowDetails}
          theme={theme}
          disabled={!!orienteePaperThemeId}
        />
      )}
      {showThemeForm && (
        <NewTheme
          open={showThemeForm}
          onOpenChange={setShowThemeForm}
          theme={theme}
        />
      )}
    </>
  );
};

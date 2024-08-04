import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Theme } from "@/interfaces";
import { getUserFirstName } from "@/utils/StringUtil";

export interface ThemeCardProps {
  theme: Theme;
  onClick?: (theme: Theme) => void;
}

export const ThemeCard = ({ theme, onClick = () => {} }: ThemeCardProps) => {
  return (
    <Card
      className="p-4 shadow-sm cursor-pointer hover:scale-[1.02] hover:transition-transform"
      onClick={() => onClick(theme)}
    >
      <div className="flex items-center gap-2">
        <span>{getUserFirstName(theme.owner.name)}</span>
        <Separator orientation="vertical" className="h-4" />
        <span className="font-semibold">{theme.label}</span>
      </div>
      <Separator className="mb-2" />
      <p className="text-sm text-gray-600 tracking-wide">{theme.summary}</p>
    </Card>
  );
};

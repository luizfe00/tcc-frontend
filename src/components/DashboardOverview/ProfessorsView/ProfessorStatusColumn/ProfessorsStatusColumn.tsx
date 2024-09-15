import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export interface ProfessorsStatusColumnProps {
  active: boolean;
}

export const ProfessorsStatusColumn = ({
  active,
}: ProfessorsStatusColumnProps) => {
  const [professorActive, setProfessorActive] = useState<boolean>(active);

  return (
    <div className="flex items-center justify-center gap-2">
      <Switch checked={professorActive} onCheckedChange={setProfessorActive} />
      <span>{professorActive ? "Ativo" : "Inativo"}</span>
    </div>
  );
};
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export interface DashboardStatusColumnProps {
  active: boolean;
}

export const DashboardStatusColumn = ({
  active,
}: DashboardStatusColumnProps) => {
  const [professorActive, setProfessorActive] = useState<boolean>(active);

  return (
    <div className="flex items-center justify-center gap-2">
      <Switch checked={professorActive} onCheckedChange={setProfessorActive} />
      <span>{professorActive ? "Ativo" : "Inativo"}</span>
    </div>
  );
};

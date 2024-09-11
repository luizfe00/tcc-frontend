import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { cn } from "@/utils";
import { useNavigate } from "react-router-dom";

interface DashboardActionsProps {
  email?: string;
  id?: string;
}

export const DashboardActions = ({ email, id }: DashboardActionsProps) => {
  const navigate = useNavigate();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          disabled={!id}
          onClick={() => navigate(`/professor?id=${id}`)}
          className={cn(!id ? "cursor-not-allowed" : "cursor-pointer")}
        >
          Detalhes
        </DropdownMenuItem>
        <DropdownMenuItem
          disabled={!email}
          onClick={() => window.alert("email: " + email)}
          className={cn(!email ? "cursor-not-allowed" : "cursor-pointer")}
        >
          Enviar email
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

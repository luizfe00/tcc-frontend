import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  MailIcon,
  MoreHorizontal,
  PenIcon,
  ShieldBanIcon,
  ShieldCheckIcon,
  TrashIcon,
} from "lucide-react";
import { cn } from "@/utils";
import { useNavigate } from "react-router-dom";
import { User } from "@/interfaces";
import { ProfessorsTableColumns } from "../ProfessorsTableColumns";

interface ProfessorActionsProps {
  email?: string;
  id?: string;
}

export const ProfessorActions = ({ email, id }: ProfessorActionsProps) => {
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

interface ProfessorTableGlobalActionsProps {
  professors: ProfessorsTableColumns[];
}

export const ProfessorTableGlobalActions = ({
  professors,
}: ProfessorTableGlobalActionsProps) => {
  const handleSendEmail = () => {};

  return (
    <div className="flex gap-2">
      <Button variant="secondary" size="icon" className="w-8 h-8">
        <MailIcon className="w-4 h-4" />
      </Button>
      <Button size="icon" className="w-8 h-8">
        <ShieldCheckIcon className="w-4 h-4" />
      </Button>
      <Button variant="destructive" size="icon" className="w-8 h-8">
        <ShieldBanIcon className="w-4 h-4" />
      </Button>
    </div>
  );
};

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MailIcon, MoreHorizontal } from "lucide-react";
import { cn } from "@/utils";
import { handleSendEmail } from "@/services/emailService";
import { StudentsTableColumns } from "../StudentsTableColumns";

interface StudentsActionsProps {
  email?: string;
  id?: string;
}

export const StudentsActions = ({ email }: StudentsActionsProps) => {
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
          disabled={!email}
          onClick={() => handleSendEmail(email ?? "", "", "")}
          className={cn(!email ? "cursor-not-allowed" : "cursor-pointer")}
        >
          Enviar email
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface StudentsTableGlobalActionsProps {
  students: StudentsTableColumns[];
}

export const StudentsTableGlobalActions = ({
  students,
}: StudentsTableGlobalActionsProps) => {
  const onSendEmail = () => {
    const emails = students.map((student) => student.email);
    handleSendEmail(emails, "", "");
  };

  return (
    <div className="flex gap-2">
      <Button
        variant="secondary"
        size="icon"
        className="w-8 h-8"
        onClick={onSendEmail}
      >
        <MailIcon className="w-4 h-4" />
      </Button>
    </div>
  );
};

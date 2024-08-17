import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useMemo, useState } from "react";
import { PaperDetailsModal } from "../../PaperDetailsModal/PaperDetailsModal";
import { useMutation } from "@tanstack/react-query";
import { submitPaper } from "@/services/paperService";
import { toast } from "@/components/ui/use-toast";
import { Approval } from "@/interfaces";
import { cn } from "@/utils";

interface PaperActionsProps {
  paperId?: string;
  approvals?: Approval[];
}

export const PaperActions = ({
  paperId = "",
  approvals = [],
}: PaperActionsProps) => {
  const [showPaperDetails, setShowPaperDetails] = useState(false);

  const mutation = useMutation({
    mutationKey: ["submitPaper"],
    mutationFn: submitPaper,
    onSuccess: () => {
      toast({
        description: "Trabalho submetido com sucesso",
        duration: 2500,
      });
    },
    onError: (error) => {
      console.log(error);
      toast({
        description: "Erro ao submeter trabalho",
        variant: "destructive",
        duration: 2500,
      });
    },
  });

  console.log({ approvals });
  const pendingApproval = useMemo(() => {
    if (!approvals.length || approvals.length === 2) return false;
    return approvals.some((approval) => approval.approval == null);
  }, [approvals]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => setShowPaperDetails(true)}
            className="cursor-pointer"
          >
            Detalhes
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={pendingApproval || paperId === ""}
            onClick={() => mutation.mutate(paperId)}
            className={cn(
              pendingApproval || paperId === ""
                ? "cursor-not-allowed"
                : "cursor-pointer"
            )}
          >
            Submeter
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <PaperDetailsModal
        open={showPaperDetails}
        onOpenChange={setShowPaperDetails}
        paperId={paperId}
      />
    </>
  );
};

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { PaperDetailsModal } from "../../PaperDetailsModal/PaperDetailsModal";

interface PaperActionsProps {
  paperId?: string;
}

export const PaperActions = ({ paperId }: PaperActionsProps) => {
  const [showPaperDetails, setShowPaperDetails] = useState(false);

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
          <DropdownMenuItem onClick={() => setShowPaperDetails(true)}>
            Detalhes
          </DropdownMenuItem>
          <DropdownMenuItem>Submeter</DropdownMenuItem>
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

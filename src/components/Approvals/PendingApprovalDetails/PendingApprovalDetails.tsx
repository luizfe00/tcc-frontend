import { PaperStages } from "@/components/Paper/PaperStages/PaperStages";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Approval } from "@/interfaces";
import { getPaperApprovalStatusLabel } from "@/utils/PaperUtil";
import { format } from "date-fns";
import { useState } from "react";

export type PendingApprovalDetailsProps = {
  approval: Approval;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const PendingApprovalDetails: React.FC<PendingApprovalDetailsProps> = ({
  approval,
  open = false,
  onOpenChange = () => {},
}) => {
  const [showStages, setShowStages] = useState(false);

  const handleAccordion = (value?: string) => {
    setShowStages(!!value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[960px] cursor-default">
        <DialogHeader>
          <DialogTitle>{approval?.paper?.theme?.label}</DialogTitle>
          <span className="text-muted-foreground text-sm font-semibold">
            Resumo
          </span>
          <Separator />
          <DialogDescription>
            {approval?.paper?.theme?.summary}
          </DialogDescription>
        </DialogHeader>
        <section>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm font-semibold">
              Informações Gerais
            </span>
            <span className="text-muted-foreground text-sm font-medium">
              Enviado em {format(approval?.createdAt ?? "", "dd/MM/yyyy")}
            </span>
          </div>
          <Separator className="mt-1 mb-2" />
          <p className="text-sm">
            <span className="font-medium">Orientando:</span>{" "}
            {approval?.paper?.orientee?.name} -{" "}
            {approval?.paper?.orientee?.email}
          </p>
          <p className="text-sm">
            <span className="font-medium">Orientador:</span>{" "}
            {approval?.paper?.advisor?.name} - {approval?.paper?.advisor?.email}
          </p>
          <div>
            <span className="text-sm text-muted-foreground font-semibold">
              Link para documento:
            </span>{" "}
            <Button variant="link" className="p-0">
              <span className="block w-full text-ellipsis">
                {approval?.paper?.documentUrl}
              </span>
            </Button>
          </div>
          <p className="text-sm">
            <span className="font-medium">Tipo:</span> {approval?.type}
          </p>
          <p className="text-sm">
            <span className="font-medium">Status:</span>{" "}
            {getPaperApprovalStatusLabel([approval])}
          </p>
        </section>
        <section>
          <Accordion
            type="single"
            collapsible
            className="mb-2"
            onValueChange={handleAccordion}
          >
            <AccordionItem value="stages">
              <AccordionTrigger>
                <div className="w-full flex items-center justify-between pr-4">
                  <span className="text-muted-foreground text-sm font-semibold">
                    Envios
                  </span>
                  <p className="text-muted-foreground text-xs font-semibold">
                    Resumo dos envios do trabalho
                  </p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {showStages && (
                  <PaperStages paperId={approval?.paper?.id ?? ""} />
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
        <footer>
          <div className="flex gap-x-4 justify-end">
            <Button variant="destructive" size="sm">
              Rejeitar
            </Button>
            <Button size="sm">Aprovar</Button>
          </div>
        </footer>
      </DialogContent>
    </Dialog>
  );
};

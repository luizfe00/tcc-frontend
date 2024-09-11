import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Paper } from "@/interfaces";
import { updatePaper } from "@/services/paperService";
import { cn } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addDays, format } from "date-fns";
import { EditIcon } from "lucide-react";
import { useState } from "react";

export interface PaperDetailsProps {
  paper: Paper;
}

export const PaperDetails = ({ paper }: PaperDetailsProps) => {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [documentLink, setDocumentLink] = useState(paper.documentUrl);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ["updatePaper"],
    mutationFn: updatePaper,
    onSuccess: (data, variables) => {
      console.log(data, variables);
      queryClient.setQueryData(["userPapers"], (oldData: Paper[]) => {
        return [{ ...oldData[0], documentUrl: variables.documentUrl }];
      });
      setShowLinkInput(false);
      toast({
        description: "Link atualizado com sucesso",
        duration: 2500,
      });
    },
    onError: () => {
      setShowLinkInput(false);
      toast({
        description: "Houve um erro ao atualizar o link do documento",
        variant: "destructive",
        duration: 2500,
      });
    },
  });

  const handleEditLink = async () => {
    if (!showLinkInput) {
      setShowLinkInput(true);
      return;
    }

    if (documentLink === paper.documentUrl) {
      setShowLinkInput(false);
      return;
    }

    mutation.mutate({ paperId: paper.id ?? "", documentUrl: documentLink });
  };

  const handleLinkClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();

    window.open(paper.documentUrl, "_blank");
  };

  return (
    <div className="mb-6 max-w-[600px]">
      <span className="block w-full font-bold text-center text-lg ">
        {paper.theme?.label}
      </span>
      <div className="flex justify-between mt-8">
        <div className="flex flex-col">
          <span className="font-semibold text-sm">
            Orientador:{" "}
            <span className="font-normal">{paper.advisor?.name}</span>
          </span>
          <span className="font-semibold text-sm">
            Orientando:{" "}
            <span className="font-normal">{paper.orientee?.name}</span>
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-sm">
            Início:{" "}
            <span className="font-normal">
              {format(paper.theme?.startDate ?? "", "dd/MM/yyyy")}
            </span>
          </span>
          <span className="font-semibold text-sm">
            Fim:{" "}
            <span className="font-normal">
              {format(
                addDays(
                  paper.theme?.startDate ?? "",
                  paper.theme?.duration ?? 30
                ),
                "dd/MM/yyyy"
              )}
            </span>
          </span>
        </div>
      </div>
      <Accordion type="single" collapsible className="mb-2">
        <AccordionItem value="teste">
          <AccordionTrigger>
            <span>Resumo</span>
          </AccordionTrigger>
          <AccordionContent>
            <p>{paper?.theme?.summary}</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <span className="block text-end w-full text-xs font-medium text-gray-500">
        {paper.approvals?.length ? "Aprovado" : "Em andamento"}
      </span>
      <div className="flex flex-col">
        <span className="text-sm font-semibold mb-1">
          Link para o documento
        </span>
        <div className="flex gap-2">
          {showLinkInput ? (
            <Input
              className="max-w-[800px] text-sm"
              value={documentLink}
              onChange={(event) => setDocumentLink(event.target.value)}
            />
          ) : paper.documentUrl ? (
            <Button
              variant={"link"}
              className={cn(!showLinkInput && "pl-0", "text-sm")}
              onClick={handleLinkClick}
            >
              {paper.documentUrl}
            </Button>
          ) : (
            <span className="block my-auto text-sm">
              Não há link para o documento
            </span>
          )}
          <Button
            variant={showLinkInput ? "default" : "ghost"}
            onClick={handleEditLink}
          >
            {showLinkInput ? (
              <span>Salvar</span>
            ) : (
              <EditIcon className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

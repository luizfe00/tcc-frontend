import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Paper } from "@/interfaces";

export interface PaperDetailsProps {
  paper: Paper;
}

export const PaperDetails = ({ paper }: PaperDetailsProps) => {
  return (
    <div className="mb-6">
      <span className="block w-full font-bold text-center text-lg">
        {paper.theme?.label}
      </span>
      <div className="flex justify-between mt-4">
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
            <span className="font-normal">{paper.theme?.startDate}</span>
          </span>
          <span className="font-semibold text-sm">
            Fim: <span className="font-normal">{paper.theme?.endDate}</span>
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
        {paper.approved ? "Aprovado" : "Em andamento"}
      </span>
    </div>
  );
};

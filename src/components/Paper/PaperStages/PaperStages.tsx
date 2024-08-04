import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { useQuery } from "@tanstack/react-query";
import { getPaperStages } from "@/services/stageService";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export interface PaperStagesProps {
  paperId?: string;
}

export const PaperStages = ({ paperId = "" }: PaperStagesProps) => {
  const { toast } = useToast();
  const { data, isLoading, error } = useQuery({
    queryKey: ["paperStages"],
    queryFn: () => getPaperStages(paperId),
  });

  if (error) {
    toast({
      description: "Houve um erro ao buscar os envios do trabalho.",
      variant: "destructive",
      duration: 2500,
    });
  }

  return (
    <div>
      <Table>
        <TableCaption>Envios do seu trabalho.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Data do envio</TableHead>
            <TableHead>Titulo</TableHead>
            <TableHead>Link</TableHead>
            <TableHead className="text-right max-w-[100px]">
              Visualizado
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <Skeleton />
          ) : (
            data?.map((stage) => (
              <TableRow key={stage.id}>
                <TableCell className="font-medium">{stage.createdAt}</TableCell>
                <TableCell>{stage.label}</TableCell>
                <TableCell>{stage.paper?.documentUrl}</TableCell>
                <TableCell className="text-right">
                  {stage.paper?.approved}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

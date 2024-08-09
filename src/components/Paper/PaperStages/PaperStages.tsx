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
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";

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

  if (isLoading) {
    return (
      <div>
        <div className="flex gap-2">
          <Skeleton className="w-1/4 h-8" />
          <Skeleton className="w-1/4 h-8" />
          <Skeleton className="w-1/4 h-8" />
          <Skeleton className="w-1/4 h-8" />
        </div>
        <div className="mt-2 flex flex-col gap-2">
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
          <Skeleton className="w-full h-8" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Table>
        <TableCaption>Envios do trabalho.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Data do envio</TableHead>
            <TableHead>Titulo</TableHead>
            <TableHead>Link</TableHead>
            <TableHead className="text-center max-w-[48px]">
              Visualizado
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((stage) => (
            <TableRow key={stage.id}>
              <TableCell className="font-medium">{stage.createdAt}</TableCell>
              <TableCell>{stage.label}</TableCell>
              <TableCell>{stage.paper?.documentUrl}</TableCell>
              <TableCell className="flex justify-center">
                {stage.viewed ? (
                  <EyeIcon className="w-6" />
                ) : (
                  <EyeSlashIcon className="w-6" />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

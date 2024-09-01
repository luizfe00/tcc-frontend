import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getPaperDetails } from "@/services/paperService";
import { getPaperStatus } from "@/utils/PaperUtil";

import { EyeSlashIcon } from "@heroicons/react/24/outline";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { EyeIcon } from "lucide-react";
import React from "react";

export interface PaperDetailsModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  paperId?: string;
}

export const PaperDetailsModal = ({
  onOpenChange,
  open = false,
  paperId = "",
}: PaperDetailsModalProps) => {
  const { data } = useQuery({
    queryKey: ["paperDetails"],
    queryFn: () => getPaperDetails(paperId),
    enabled: !!open && !!paperId,
  });

  const paperStatus = React.useMemo(
    () => getPaperStatus(data?.approvals ?? []),
    [data?.approvals]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[60%]">
        <DialogHeader>
          <DialogTitle>{data?.theme?.label}</DialogTitle>
          <DialogDescription>
            <div className="flex items-center justify-between">
              <span>
                {data?.orientee?.name} - {data?.orientee?.email}
              </span>
              <span>{data?.type}</span>
            </div>
            <span className="text-xs">
              {dayjs(data?.createdAt).format("DD/MM/YYYY")}
            </span>
          </DialogDescription>
        </DialogHeader>
        <TooltipProvider>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium">
                De {dayjs(data?.theme?.startDate).format("DD/MM/YYYY")} até{" "}
                {dayjs(data?.theme?.endDate).format("DD/MM/YYYY")}
              </span>
              <Tooltip>
                <TooltipTrigger>{paperStatus.icon}</TooltipTrigger>
                <TooltipContent>{paperStatus.label}</TooltipContent>
              </Tooltip>
            </div>
            <p>{data?.theme?.summary}</p>
            <div className="mt-2">
              <span className="text-gray-500 font-medium">Envios</span>
              <Separator className="mt-1 mb-2" />
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Titulo</TableHead>
                    <TableHead>Mensagem</TableHead>
                    <TableHead>Feedback</TableHead>
                    <TableHead className="text-center">Visualizado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.stages?.length ? (
                    data.stages.map((stage) => (
                      <TableRow key={stage.id}>
                        <TableCell>
                          {dayjs(stage.createdAt).format("DD/MM/YYYY")}
                        </TableCell>
                        <TableCell>{stage.label}</TableCell>
                        <TableCell>{stage.message}</TableCell>
                        <TableCell>{stage.feedback}</TableCell>
                        <TableCell>
                          <div className="w-full h-full flex justify-center items-center">
                            {stage.viewed ? (
                              <EyeIcon className="w-4 h-4" />
                            ) : (
                              <EyeSlashIcon className="w-4 h-4" />
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5}>Nenhum envio encontrado</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </TooltipProvider>
      </DialogContent>
    </Dialog>
  );
};

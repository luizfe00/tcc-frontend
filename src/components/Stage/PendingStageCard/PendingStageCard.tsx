import { Card } from "@/components/ui/card";
import { PaperStage } from "@/interfaces";
import { PendingStageDetails } from "../PendingStageDetails/PendingStageDetails";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { updatePendingFeedback } from "@/services/stageService";
import { toast } from "@/components/ui/use-toast";
import { formatDate } from "@/utils/DateUtil";

export interface PendingStageCardProps {
  stage?: PaperStage;
}

export const PendingStageCard = ({ stage }: PendingStageCardProps) => {
  const mutation = useMutation({
    mutationKey: ["viewPending"],
    mutationFn: updatePendingFeedback,
  });

  const [showPendingDetails, setShowPendingDetails] = useState(false);

  const handleOpenPendingDetails = async () => {
    if (!stage?.viewed) {
      try {
        mutation.mutate({ id: stage?.id ?? "", viewed: true });
        toast({ description: "Envio visualizado.", duration: 2500 });
      } catch (error) {
        toast({
          description: "Ocorreu um erro ao atualizar o envio",
          variant: "destructive",
          duration: 2500,
        });
      }
    }
    setShowPendingDetails(true);
  };

  return (
    <>
      <Card
        onClick={() => handleOpenPendingDetails()}
        className="p-3 max-w-[400px] hover:cursor-pointer transition-transform hover:scale-[1.03] hover:bg-slate-50"
      >
        <div className="flex justify-between">
          <span className="text-sm font-medium">
            {stage?.paper?.theme?.label}
          </span>
          <span className="text-xs">{formatDate(stage?.createdAt)}</span>
        </div>
        <div>
          <span className="text-xs font-medium">
            {stage?.paper?.orientee?.name}
          </span>
          <p className="text-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae,
            molestias excepturi voluptatum expedita est iusto quo ipsum eos
            alias, deleniti minima explicabo molestiae provident quis? Quasi
            incidunt impedit adipisci sit!
          </p>
        </div>
      </Card>
      <PendingStageDetails
        stage={stage}
        open={showPendingDetails}
        onOpenChange={setShowPendingDetails}
      />
    </>
  );
};

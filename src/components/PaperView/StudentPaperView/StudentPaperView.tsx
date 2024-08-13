import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Separator } from "@radix-ui/react-separator";
import { Paper } from "@/interfaces";
import { PaperDetails } from "../../Paper/PaperDetails/PaperDetails";
import { NewDelivery } from "../../Paper/NewDelivert/NewDelivery";
import { PaperStages } from "../../Paper/PaperStages/PaperStages";
import { Button } from "../../ui/button";

export interface StudentPaperViewProps {
  papers?: Paper[];
}

export const StudentPaperView = ({ papers = [] }: StudentPaperViewProps) => {
  const [showNewDeliveryDialog, setShowNewDeliveryDialog] = useState(false);

  return (
    <>
      {papers?.length ? <PaperDetails paper={papers?.[0]} /> : <></>}
      <div className="my-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">Progresso</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowNewDeliveryDialog(true)}
            disabled={!papers.length}
          >
            <PlusIcon className="w-6" />
          </Button>
        </div>
        <Separator className="mt-1" />
      </div>
      <PaperStages paperId={papers?.[0]?.id} />
      <NewDelivery
        paperId={papers?.[0]?.id ?? ""}
        open={showNewDeliveryDialog}
        onOpenChange={setShowNewDeliveryDialog}
      />
    </>
  );
};

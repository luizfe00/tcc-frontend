import { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Separator } from "@radix-ui/react-separator";
import { Paper } from "@/interfaces";
import { PaperDetails } from "../../Paper/PaperDetails/PaperDetails";
import { NewDelivery } from "../../Paper/NewDelivert/NewDelivery";
import { PaperStages } from "../../Paper/PaperStages/PaperStages";
import { Button } from "../../ui/button";
import { Card, CardContent } from "@/components/ui/card";

export interface StudentPaperViewProps {
  papers?: Paper[];
}

export const StudentPaperView = ({ papers = [] }: StudentPaperViewProps) => {
  const [showNewDeliveryDialog, setShowNewDeliveryDialog] = useState(false);

  return (
    <div className="flex items-center justify-center pt-8">
      <Card>
        <CardContent className="p-8">
          {papers?.length ? <PaperDetails paper={papers?.[0]} /> : <></>}
        </CardContent>
      </Card>
      {/* <Separator className="mt-1" /> */}
      {/* <PaperStages paperId={papers?.[0]?.id} />
      <NewDelivery
        paperId={papers?.[0]?.id ?? ""}
        open={showNewDeliveryDialog}
        onOpenChange={setShowNewDeliveryDialog}
      /> */}
    </div>
  );
};

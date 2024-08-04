import Navbar from "@/components/Navbar/Navbar";
import { PaperDetails } from "@/components/Paper/PaperDetails/PaperDetails";
import { PaperStages } from "@/components/Paper/PaperStages/PaperStages";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getUserPapers } from "@/services/paperService";
import { useQuery } from "@tanstack/react-query";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { NewDelivery } from "@/components/Paper/NewDelivert/NewDelivery";

export const PapersPage = () => {
  const { data } = useQuery({
    queryKey: ["userPapers"],
    queryFn: getUserPapers,
  });

  const [showNewDeliveryDialog, setShowNewDeliveryDialog] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="h-full p-4">
        {data?.length && <PaperDetails paper={data?.[0]} />}
        <div className="my-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-600">Progresso</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowNewDeliveryDialog(true)}
            >
              <PlusIcon className="w-6" />
            </Button>
          </div>
          <Separator className="mt-1" />
        </div>
        <PaperStages paperId={data?.[0].id} />
      </div>
      <NewDelivery
        paperId={data?.[0].id ?? ""}
        open={showNewDeliveryDialog}
        onOpenChange={setShowNewDeliveryDialog}
      />
    </div>
  );
};

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getPendingApprovals } from "@/services/approvalsService";
import { useQuery } from "@tanstack/react-query";
import { PendingApprovalCard } from "../PendingApprovalCard/PendingApprovalCard";

export const PendingApprovalsList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["pendingAppprovals"],
    queryFn: getPendingApprovals,
  });

  return (
    <div>
      <div className="flex flex-col mb-2">
        <span className="font-medium text-muted-foreground">Pendências</span>
        <span className="text-xs text-muted-foreground">
          Trabalhos produzidos pendentes de aprovação.
        </span>
        <Separator className="mt-1" />
      </div>
      {isLoading ? (
        <Skeleton className="w-full h-36" />
      ) : data?.length ? (
        <ScrollArea className="w-full whitespace-nowrap rounded-md">
          <div className="flex w-max p-4 space-x-4">
            {data.map((approval) => (
              <PendingApprovalCard key={approval.id} approval={approval} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      ) : (
        <span className="text-xs">Não há pendencias</span>
      )}
    </div>
  );
};

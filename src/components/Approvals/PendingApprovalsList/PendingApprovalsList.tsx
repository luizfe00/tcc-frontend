import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getPendingApprovals } from "@/services/approvalsService";
import { useQuery } from "@tanstack/react-query";
import { PendingApprovalCard } from "../PendingApprovalCard/PendingApprovalCard";
import { cn } from "@/utils";
import { useMemo } from "react";

interface PendingApprovalsListProps {
  filter?: string;
  horizontal?: boolean;
}

export const PendingApprovalsList = ({
  filter,
  horizontal,
}: PendingApprovalsListProps) => {
  const { data, isLoading } = useQuery({
    queryKey: ["pendingAppprovals"],
    queryFn: getPendingApprovals,
  });

  const filteredData = useMemo(() => {
    if (!data) return [];
    if (!filter) return data;
    return data?.filter((approval) =>
      approval.paper?.theme?.label
        ?.toLowerCase()
        .includes(filter?.toLowerCase() || "")
    );
  }, [data, filter]);

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
        <ScrollArea
          className={cn(
            "w-full whitespace-nowrap rounded-md",
            horizontal && "flex flex-row"
          )}
        >
          <div
            className={cn(
              "flex flex-col w-max p-4 space-x-4",
              horizontal && "flex-row"
            )}
          >
            {filteredData.map((approval) => (
              <PendingApprovalCard key={approval.id} approval={approval} />
            ))}
          </div>
          {horizontal && <ScrollBar orientation="horizontal" />}
        </ScrollArea>
      ) : (
        <span className="text-xs">Não há pendencias</span>
      )}
    </div>
  );
};

import { PendingApprovalsList } from "@/components/Approvals/PendingApprovalsList/PendingApprovalsList";
import { PapersGeneralView } from "@/components/Charts/PapersGeneralView";
import { PaperPerMonthView } from "@/components/Charts/PaperPerMonthView";
import { getDashboardData } from "@/services/dashboardService";
import { useQuery } from "@tanstack/react-query";

export const DashboardPage = () => {
  const { data } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
  });

  return (
    <div className="h-screen p-4 flex flex-col gap-4">
      <PendingApprovalsList />
      <div className="flex gap-4">
        <PaperPerMonthView data={data?.papers} />
        <PapersGeneralView data={data?.papers} />
      </div>
    </div>
  );
};

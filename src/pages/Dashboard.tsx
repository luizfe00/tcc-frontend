import { PendingApprovalsList } from "@/components/Approvals/PendingApprovalsList/PendingApprovalsList";
import { DashboardOverview } from "@/components/DashboardOverview/DashboardOverview";

export const DashboardPage = () => {
  return (
    <div className="p-4 flex flex-col gap-4">
      <PendingApprovalsList />
      <DashboardOverview />
    </div>
  );
};

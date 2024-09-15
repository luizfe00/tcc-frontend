import { PendingApprovalsList } from "@/components/Approvals/PendingApprovalsList/PendingApprovalsList";
import { SummaryView } from "@/components/DashboardOverview/SummaryView/SummaryView";
import { Sidebar } from "@/components/Sidebar/Sidebar";

export const DashboardPage = () => {
  return (
    <div className="flex gap-8">
      <Sidebar />
      <div className="p-4 flex gap-4 w-full">
        <SummaryView />
        <PendingApprovalsList />
      </div>
    </div>
  );
};

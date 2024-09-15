import { StudentsView } from "@/components/DashboardOverview/StudentsView/StudentsView";
import { Sidebar } from "@/components/Sidebar/Sidebar";

export const StudentsPage = () => {
  return (
    <div className="flex gap-8">
      <Sidebar />
      <div className="p-4 flex flex-col gap-4 w-full">
        <StudentsView />
      </div>
    </div>
  );
};

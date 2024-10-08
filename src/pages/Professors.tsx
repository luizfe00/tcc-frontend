import { ProfessorTabs } from "@/components/DashboardOverview/ProfessorsView/ProfessorTabs/ProfessorTabs";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Card, CardContent } from "@/components/ui/card";

export const ProfessorsPage = () => {
  return (
    <div className="flex gap-8">
      <Sidebar />
      <div className="p-4 flex flex-col gap-4 w-full">
        <Card>
          <CardContent className="py-4">
            <ProfessorTabs />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

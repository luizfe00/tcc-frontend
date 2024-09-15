import { ProfessorsTable } from "@/components/DashboardOverview/ProfessorsView/ProfessorsTable";
import { Sidebar } from "@/components/Sidebar/Sidebar";
import { Card, CardContent } from "@/components/ui/card";

export const ProfessorsPage = () => {
  return (
    <div className="flex gap-8">
      <Sidebar />
      <div className="p-4 flex flex-col gap-4 w-full">
        <Card>
          <CardContent className="py-4">
            <ProfessorsTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

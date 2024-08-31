import { ProfessorDashboardBIResponse } from "@/interfaces/Dashboard";
import { Card, CardContent } from "../ui/card";
import { Charts } from "./Charts/Charts";
import { ProfessorTableData } from "./ProfessorTable/ProfessorTableData/ProfessorTableData";
import { Skeleton } from "../ui/skeleton";

export interface ProfessorOverviewProps {
  data?: ProfessorDashboardBIResponse;
}

export const ProfessorOverview: React.FC<ProfessorOverviewProps> = ({
  data,
}) => {
  return (
    <Card>
      <CardContent>
        {!data ? (
          <ProfessorOverviewSkeleton />
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 pt-4">
              <Charts data={data} />
            </div>
            <div>
              <ProfessorTableData />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const ProfessorOverviewSkeleton = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 pt-4">
        <Skeleton className="w-full h-[300px]" />
      </div>
      <div>
        <Skeleton className="w-full h-[300px]" />
      </div>
    </div>
  );
};

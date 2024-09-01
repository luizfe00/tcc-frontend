import { ProfessorDashboardBIResponse } from "@/interfaces/Dashboard";
import { Card, CardContent } from "../ui/card";
import { Charts } from "./Charts/Charts";
import { Skeleton } from "../ui/skeleton";
import { ProfessorDetailDataTable } from "./ProfessorTable/ProfessorTableData/ProfessorTableData";
import {
  professorDetailColumns,
  ProfessorTable,
} from "./ProfessorTable/ProfessorTableColumns/ProfessorTableColumns";
import { useMemo } from "react";
import dayjs from "dayjs";
import { getPaperStatus } from "@/utils/PaperUtil";

export interface ProfessorOverviewProps {
  data?: ProfessorDashboardBIResponse;
}

export const ProfessorOverview: React.FC<ProfessorOverviewProps> = ({
  data,
}) => {
  const professorTableData: ProfessorTable[] = useMemo(() => {
    if (!data || !data?.professor?.themes) return [];
    return data?.professor?.themes?.map((detail) => ({
      id: detail.id,
      dateRange: `de ${dayjs(detail?.startDate).format(
        "DD/MM/YYYY"
      )} até ${dayjs(detail?.endDate).format("DD/MM/YYYY")}`,
      themeName: detail.label,
      category: detail.categories
        .flatMap((category) => category.name)
        .join(", "),
      approvals: detail.paper?.approvals ?? [],
      link: detail.paper?.documentUrl ?? "",
      type: detail.paper?.type ?? "",
      status: getPaperStatus(detail.paper?.approvals ?? []).label,
    }));
  }, [data]);

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
              <ProfessorDetailDataTable
                columns={professorDetailColumns}
                data={professorTableData}
                categories={data?.professor?.categories.flatMap((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
              />
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

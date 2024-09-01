import { PendingApprovalsList } from "@/components/Approvals/PendingApprovalsList/PendingApprovalsList";
import { PapersGeneralView } from "@/components/Charts/PapersGeneralView";
import { PaperPerMonthView } from "@/components/Charts/PaperPerMonthView";
import { getDashboardData } from "@/services/dashboardService";
import { useQuery } from "@tanstack/react-query";
import { DashboardDataTable } from "@/components/DashboardTable/DashboardData/DashboardData";
import {
  dashboardColumns,
  DashboardTable,
} from "@/components/DashboardTable/DashboardColumns/DashboardColumns";
import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";

export const DashboardPage = () => {
  const { data } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
  });

  console.log(data);

  const dashboardTableData = useMemo(() => {
    if (!data) return [];
    const dashboardData: DashboardTable[] = data.papers.professorPaperBI.map(
      (item) => {
        const professor = data.themes.professorThemeStats.find(
          (professor) => professor.professorEmail === item.professorEmail
        );

        return {
          active: true,
          email: item.professorEmail,
          enrollment: professor?.professorEnrollment ?? "",
          id: professor?.professorId ?? "",
          name: item.professorName,
          ptccCount: item.ptccCount,
          tccCount: item.tccCount,
          themeCount: professor?.totalThemes ?? 0,
        };
      }
    );

    return dashboardData;
  }, [data]);

  return (
    <div className="p-4 flex flex-col gap-4">
      <PendingApprovalsList />
      <Card>
        <CardContent className="pb-0 pt-4">
          <div className="flex gap-4">
            <PaperPerMonthView data={data?.papers.paperPerMonth} />
            <PapersGeneralView data={data?.papers} />
          </div>
          <div>
            <DashboardDataTable
              columns={dashboardColumns}
              data={dashboardTableData}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

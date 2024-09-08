import { PaperPerMonthView } from "@/components/Charts/PaperPerMonthView";
import { PapersGeneralView } from "@/components/Charts/PapersGeneralView";
import {
  DashboardTable,
  dashboardColumns,
} from "@/components/DashboardTable/DashboardColumns/DashboardColumns";
import { DashboardDataTable } from "@/components/DashboardTable/DashboardData/DashboardData";
import { InterestsChart } from "@/components/Professor/Charts/InterestChart/InterestsChart";
import { Card, CardContent } from "@/components/ui/card";
import { getDashboardData } from "@/services/dashboardService";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const SummaryView = () => {
  const { data } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
  });

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
    <Card>
      <CardContent className="py-4">
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
  );
};

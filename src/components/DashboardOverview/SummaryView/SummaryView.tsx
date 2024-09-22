import { PaperPerMonthView } from "@/components/Charts/PaperPerMonthView";
import { PapersGeneralView } from "@/components/Charts/PapersGeneralView";
import { Card, CardContent } from "@/components/ui/card";
import { getDashboardData } from "@/services/dashboardService";
import { useQuery } from "@tanstack/react-query";
import { CategoriesContainer } from "../CategoriesView/CategoriesContainer";
import { ThemeActiveChart } from "@/components/Charts/ThemeActive";

export const SummaryView = () => {
  const { data } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboardData,
  });

  return (
    <Card className="rounded-sm">
      <CardContent className="py-4 flex flex-col gap-4">
        <div className="flex gap-4">
          <PaperPerMonthView data={data?.papers.paperPerMonth} />
          <PapersGeneralView data={data?.papers} />
          <ThemeActiveChart data={data?.themes} />
        </div>
        <CategoriesContainer data={data?.categories} />
      </CardContent>
    </Card>
  );
};

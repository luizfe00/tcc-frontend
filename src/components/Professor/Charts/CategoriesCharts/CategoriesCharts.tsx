import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProfessorCategoryStatsQuery } from "@/interfaces/Dashboard";
import { useMemo, useState } from "react";

export interface CategoriesChartsProps {
  data: ProfessorCategoryStatsQuery[];
}

export const CategoriesCharts: React.FC<CategoriesChartsProps> = ({ data }) => {
  const categories = useMemo(() => {
    return data.map((category) => category.name);
  }, [data]);

  const chartData = useMemo(() => {
    return data.map((category) => ({
      name: category.name,
      activeThemes: category.activeThemes,
      inactiveThemes: category.inactiveThemes,
      completedPapers: category.completedPapers,
      pendingPapers: category.pendingPapers,
      ptccPapers: category.ptccPapers,
      tccPapers: category.tccPapers,
    }));
  }, [data]);

  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle>Categorias</CardTitle>
        <CardDescription>Resumo das categorias</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 px-2 sm:p-6"></CardContent>
    </Card>
  );
};

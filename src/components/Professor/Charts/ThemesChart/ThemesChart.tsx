import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { monthMap } from "@/constants/Months";
import { ProfessorThemeStatsQuery } from "@/interfaces/Dashboard";
import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

export interface ThemesChartProps {
  data: ProfessorThemeStatsQuery;
}

const chartConfig = {
  completed: {
    label: "Concluídos",
    color: "hsl(var(--chart-1))",
  },
  pending: {
    label: "Pendentes",
    color: "hsl(var(--chart-2))",
  },
  rejected: {
    label: "Rejeitados",
    color: "hsl(var(--chart-3))",
  },
  inactive: {
    label: "Não ativos",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export const ThemesChart = ({ data }: ThemesChartProps) => {
  data.themesByMonth["2024-10"] = {
    active: {
      completed: 10,
      pending: 10,
      rejected: 5,
    },
    inactive: 10,
  };
  data.themesByMonth["2024-08"] = {
    active: {
      completed: 13,
      pending: 5,
      rejected: 5,
    },
    inactive: 4,
  };
  data.themesByMonth["2024-07"] = {
    active: {
      completed: 13,
      pending: 5,
      rejected: 5,
    },
    inactive: 4,
  };
  data.themesByMonth["2024-06"] = {
    active: {
      completed: 13,
      pending: 5,
      rejected: 5,
    },
    inactive: 4,
  };
  data.themesByMonth["2024-05"] = {
    active: {
      completed: 13,
      pending: 5,
      rejected: 5,
    },
    inactive: 4,
  };
  const chartData = React.useMemo(() => {
    return Object.entries(data.themesByMonth)
      .map(([month, stats]) => {
        const [year, monthNumber] = month.split("-");
        const monthName =
          monthMap[
            monthNumber.startsWith("0") ? monthNumber.slice(1) : monthNumber
          ];
        return {
          month: monthName,
          completed: stats.active.completed,
          pending: stats.active.pending,
          rejected: stats.active.rejected,
          inactive: stats.inactive,
        };
      })
      .reverse();
  }, [data]);

  return (
    <Card className="w-full">
      <CardHeader className="items-center">
        <CardTitle>Temas</CardTitle>
        <CardDescription>
          Visualização dos temas ativos e inativos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart accessibilityLayer data={chartData} barSize={20}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              textAnchor="end"
              angle={-15}
              dx={15}
              dy={-10}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="completed"
              stackId="active"
              fill={chartConfig.completed.color}
            />
            <Bar
              dataKey="pending"
              stackId="active"
              fill={chartConfig.pending.color}
            />
            <Bar
              dataKey="rejected"
              stackId="active"
              fill={chartConfig.rejected.color}
            />
            <Bar dataKey="inactive" fill={chartConfig.inactive.color} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

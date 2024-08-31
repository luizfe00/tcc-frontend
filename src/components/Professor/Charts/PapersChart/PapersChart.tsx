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
import { ProfessorPaperStatsQuery } from "@/interfaces/Dashboard";
import { useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
  ptccPending: {
    label: "PTCCs pendentes",
    color: "hsl(var(--chart-1))",
  },
  ptccApproved: {
    label: "PTCCs aprovados",
    color: "hsl(var(--chart-2))",
  },
  tccPending: {
    label: "TCCs pendentes",
    color: "hsl(var(--chart-3))",
  },
  tccApproved: {
    label: "TCCs aprovados",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

export interface PapersChartProps {
  data: ProfessorPaperStatsQuery;
}

const PapersChart: React.FC<PapersChartProps> = ({ data }) => {
  const chartData = useMemo(
    () => [
      {
        label: "Em Andamento",
        ptccPending: data.ptccPapers - data.ptccApprovedPapers,
        tccPending: data.tccPapers - data.tccApprovedPapers,
      },
      {
        label: "Aprovados",
        ptccApproved: data.ptccApprovedPapers,
        tccApproved: data.tccApprovedPapers,
      },
    ],
    [data]
  );

  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle>Trabalhos Orientados</CardTitle>
        <CardDescription>Resumo dos trabalhos orientados</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 w-full">
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={"label"}
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="ptccPending"
              stackId={"a"}
              fill="var(--color-ptccPending)"
              radius={[0, 0, 6, 6]}
            />
            <Bar
              dataKey="tccPending"
              stackId={"a"}
              fill="var(--color-tccPending)"
              radius={[6, 6, 0, 0]}
            />
            <Bar
              dataKey="ptccApproved"
              stackId={"a"}
              fill="var(--color-ptccApproved)"
              radius={[0, 0, 6, 6]}
            />
            <Bar
              dataKey="tccApproved"
              stackId={"a"}
              fill="var(--color-tccApproved)"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PapersChart;

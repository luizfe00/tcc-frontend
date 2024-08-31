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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ProfessorInterestStatsQuery } from "@/interfaces/Dashboard";
import { useMemo } from "react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

export interface InterestsChartProps {
  data: ProfessorInterestStatsQuery;
}

const chartConfig = {
  count: {
    label: "Interesses",
  },
  pending: {
    label: "Pendentes",
    color: "hsl(var(--chart-1))",
  },
  approved: {
    label: "Aceitos",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export const InterestsChart: React.FC<InterestsChartProps> = ({ data }) => {
  data.approvedInterests = 8;
  data.pendingInterests = 12;
  data.totalInterests = 20;

  const chartData = useMemo(
    () => [
      {
        name: "Interesses",
        pending: data.pendingInterests,
        approved: data.approvedInterests,
      },
    ],
    [data]
  );

  return (
    <Card>
      <CardHeader className="items-center pb-0">
        <CardTitle>Interesses</CardTitle>
        <CardDescription>Resumo dos interesses enviados</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {data.totalInterests > 0 ? (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square w-full max-w-[300px]"
          >
            <RadialBarChart
              data={chartData}
              endAngle={180}
              innerRadius={80}
              outerRadius={130}
            >
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) - 16}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {data.totalInterests}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 4}
                            className="fill-muted-foreground"
                          >
                            Interesses
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </PolarRadiusAxis>
              <RadialBar
                dataKey="pending"
                fill="var(--color-pending)"
                stackId={1}
                cornerRadius={5}
                // label={{ fill: "white", fontSize: 12, position: "insideStart" }}
                className="stroke-transparent stroke-2"
              />
              <RadialBar
                dataKey="approved"
                fill="var(--color-approved)"
                stackId={1}
                cornerRadius={5}
                // label={{ fill: "white", fontSize: 12, position: "insideStart" }}
                className="stroke-transparent stroke-2"
              />
            </RadialBarChart>
          </ChartContainer>
        ) : (
          <EmptyInterestsChart />
        )}
      </CardContent>
    </Card>
  );
};

const EmptyInterestsChart = () => {
  return (
    <div className="w-full h-[120px] flex items-center justify-center">
      <span className="text-muted-foreground block text-center w-full">
        Nenhum interesse encontrado
      </span>
    </div>
  );
};

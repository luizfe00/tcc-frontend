import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { PaperBI } from "@/interfaces/Dashboard";
import { useMemo } from "react";

const chartConfig = {
  count: {
    label: "Qtd",
    color: "#2563eb",
  },
  ptcc: {
    label: "PTCC",
    color: "#5c25fa",
  },
  tcc: {
    label: "PTCC",
    color: "#60b5da",
  },
} satisfies ChartConfig;

export type PapersGeneralViewProps = {
  data?: PaperBI;
};

// function getRandomInt(max) {
//   return Math.floor(Math.random() * max);
// }

export const PapersGeneralView: React.FC<PapersGeneralViewProps> = ({
  data,
}) => {
  const chartData = useMemo(() => {
    return [
      { type: "ptcc", count: data?.ptccCount, fill: "var(--color-ptcc)" },
      { type: "tcc", count: data?.tccCount, fill: "var(--color-tcc)" },
    ];
  }, [data]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Artigos em produção</CardTitle>
        <CardDescription>Resumo dos artigos em produção</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="type"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {data?.totalPapers}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Quantidade
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

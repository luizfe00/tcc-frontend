import { ThemeBI } from "@/interfaces/Dashboard";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

const chartConfig = {
  active: {
    label: "Atribuídos",
    color: "hsl(var(--chart-2))",
  },
  inactive: {
    label: "Disponíveis",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface ThemeActiveProps {
  data?: ThemeBI;
}

export const ThemeActiveChart = ({ data }: ThemeActiveProps) => {
  const chartData = useMemo(() => {
    return [
      {
        active: data?.themeActiveCount ?? 0,
        inactive: (data?.themeCount ?? 0) - (data?.themeActiveCount ?? 0),
      },
    ];
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Temas</CardTitle>
        <CardDescription>Resumo da situação dos temas</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={90}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
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
                          y={(viewBox.cy || 0) - 36}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {data?.themeCount}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy || 0}
                          className="fill-muted-foreground"
                        >
                          Temas
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="active"
              fill={chartConfig.active.color}
              stackId="a"
              cornerRadius={2}
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="inactive"
              fill={chartConfig.inactive.color}
              stackId="a"
              cornerRadius={2}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <div className="flex flex-grow gap-4 w-full items-center">
          <h4 className="scroll-m-20 font-semibold tracking-tight">
            Temas de professores:
          </h4>
          <span className="text-sm text-muted-foreground">
            {data?.professorThemeCount}
          </span>
        </div>
        <div className="flex flex-grow gap-4 w-full items-center">
          <h4 className="scroll-m-20 font-semibold tracking-tight">
            Temas de alunos:
          </h4>
          <span className="text-sm text-muted-foreground">
            {data?.studentThemeCount}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

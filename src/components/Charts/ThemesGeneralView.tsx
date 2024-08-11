import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const chartData = [
  { month: "Janeiro", open: 26, ptcc: 20, tcc: 6 },
  { month: "Fevereiro", open: 16, ptcc: 10, tcc: 6 },
  { month: "Março", open: 8, ptcc: 5, tcc: 3 },
  { month: "Abril", open: 20, ptcc: 10, tcc: 10 },
  { month: "Maio", open: 14, ptcc: 6, tcc: 8 },
  { month: "Junho", open: 30, ptcc: 20, tcc: 10 },
];

const chartConfig = {
  open: {
    label: "Abertos",
    color: "#2563eb",
  },
  ptcc: {
    label: "PTCC",
    color: "#60a5fa",
  },
  tcc: {
    label: "PTCC",
    color: "#60b5da",
  },
} satisfies ChartConfig;

export const ThemesGeneralView = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Artigos em Produção</CardTitle>
        <CardDescription>Resumo dos artigos por mês.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="open"
              type="natural"
              fill="var(--color-open)"
              fillOpacity={0.4}
              stroke="var(--color-open)"
              stackId="a"
            />
            <Area
              dataKey="ptcc"
              type="natural"
              fill="var(--color-ptcc)"
              fillOpacity={0.4}
              stroke="var(--color-ptcc)"
              stackId="a"
            />
            <Area
              dataKey="tcc"
              type="natural"
              fill="var(--color-tcc)"
              fillOpacity={0.4}
              stroke="var(--color-tcc)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

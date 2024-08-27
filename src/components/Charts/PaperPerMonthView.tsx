import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
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
import { useCallback } from "react";
import { getMonth } from "date-fns";
import { PaperPerMonthQuery } from "@/interfaces/Dashboard";

type PapersPerMonthChart = {
  month: string;
  open: number;
  ptcc: number;
  tcc: number;
};

const monthMap: Record<string, string> = {
  "1": "Janeiro",
  "2": "Fevereiro",
  "3": "Março",
  "4": "Abril",
  "5": "Maio",
  "6": "Junho",
  "7": "Julho",
  "8": "Agosto",
  "9": "Setembro",
  "10": "Outubro",
  "11": "Novembro",
  "12": "Dezembro",
};

const chartConfig = {
  ptcc: {
    label: "PTCC",
    color: "hsl(var(--chart-2))",
  },
  tcc: {
    label: "TCC",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export type PaperPerMonthViewProps = {
  data?: PaperPerMonthQuery[];
};

export const PaperPerMonthView: React.FC<PaperPerMonthViewProps> = ({
  data = [],
}) => {
  const buildChardData = useCallback(() => {
    const chartData: PapersPerMonthChart[] = data.map((entry) => ({
      month: monthMap[entry.month],
      open: entry.totalPapers,
      ptcc: entry.ptccCount,
      tcc: entry.tccCount,
    }));
    const emptyRows = 6 - data.length;

    if (emptyRows > 0) {
      const month = getMonth(new Date());
      let initialMonth = month - data.length;
      for (let i = 0; i < emptyRows; i++) {
        const month = monthMap[initialMonth];
        chartData.push({ month, open: 0, ptcc: 0, tcc: 0 });
        initialMonth--;
      }
    }

    return chartData.reverse();
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Evolução dos trabalhos por mês</CardTitle>
        <CardDescription>
          Evolução mensal dos trabalhos em andamento separado em TCC e PTCC.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart data={buildChardData()} accessibilityLayer>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              dataKey="open"
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="ptcc"
              fill="var(--color-ptcc)"
              radius={[4, 4, 0, 0]}
            />
            <Bar dataKey="tcc" fill="var(--color-tcc)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

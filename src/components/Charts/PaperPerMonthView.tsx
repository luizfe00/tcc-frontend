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
import { PaperPerMonth } from "@/interfaces/Dashboard";
import { useCallback } from "react";
import { getMonth } from "date-fns";

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
  open: {
    label: "Abertos",
    color: "#2563eb",
  },
  ptcc: {
    label: "PTCC",
    color: "#60a5fa",
  },
  tcc: {
    label: "TCC",
    color: "#60b5da",
  },
} satisfies ChartConfig;

export type PaperPerMonthViewProps = {
  data?: PaperPerMonth[];
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
          <AreaChart
            accessibilityLayer
            data={buildChardData()}
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
              stackId="b"
            />
            <Area
              dataKey="tcc"
              type="natural"
              fill="var(--color-tcc)"
              fillOpacity={0.4}
              stroke="var(--color-tcc)"
              stackId="c"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

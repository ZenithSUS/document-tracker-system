import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", desktop: 186, fill: "blue" },
  { month: "February", desktop: 305, fill: "blue" },
  { month: "March", desktop: 237, fill: "blue" },
  { month: "April", desktop: 73, fill: "blue" },
  { month: "May", desktop: 209, fill: "blue" },
  { month: "June", desktop: 214, fill: "blue" },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function MonthlyUsage() {
  return (
    <Card className="bg-card text-card-foreground border-1 dark:border-white">
      <CardHeader>
        <CardTitle>Monthly Usage</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            <XAxis type="number" dataKey="desktop" hide />
            <YAxis
              dataKey="month"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <div className="leading-none text-xs text-muted-foreground"></div>
      </CardFooter>
    </Card>
  );
}

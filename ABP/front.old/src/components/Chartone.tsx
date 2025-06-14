"use client";

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

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
const chartData = [
  { month: "January", year: 2021, desktop: 186, mobile: 80 },
  { month: "February", year: 2021, desktop: 305, mobile: 200 },
  { month: "March", year: 2021, desktop: 237, mobile: 120 },
  { month: "April", year: 2021, desktop: 73, mobile: 190 },
  { month: "May", year: 2021, desktop: 209, mobile: 130 },
  { month: "June", year: 2021, desktop: 214, mobile: 140 },
  { month: "July", year: 2021, desktop: 198, mobile: 75 },
  { month: "August", year: 2021, desktop: 250, mobile: 100 },
  { month: "September", year: 2021, desktop: 276, mobile: 110 },
  { month: "October", year: 2021, desktop: 230, mobile: 90 },
  { month: "November", year: 2021, desktop: 210, mobile: 85 },
  { month: "December", year: 2021, desktop: 260, mobile: 95 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function Chartone() {
  return (
    <div className="h-[10px]">
      <Card className="gap-0 m-0 p-0 justify-center ">
        <CardHeader>
          <CardTitle>Line Chart - Label</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>

        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20,
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
                content={<ChartTooltipContent indicator="line" />}
              />
              <Line
                dataKey="desktop"
                type="natural"
                stroke="gray"
                strokeWidth={2}
                dot={{
                  fill: "var(--color-desktop)",
                }}
                activeDot={{
                  r: 6,
                }}
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Line>
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

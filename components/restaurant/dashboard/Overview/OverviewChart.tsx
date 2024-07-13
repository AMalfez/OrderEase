"use client";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#eb5c10",
  },
} satisfies ChartConfig;
const OverviewChart = () => {
  return (
    <div className="mt-10 mb-10 py-3 h-full w-full hidden md:block">
      <ChartContainer config={chartConfig} className="w-full min-h-[500px] rounded-lg p-3">
        <BarChart accessibilityLayer data={chartData} barGap={10} >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={5}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            dataKey="desktop"
            tickLine={false}
            tickMargin={5}
            axisLine={false}
          />
          <Bar dataKey="desktop" fill="var(--color-desktop)" barSize={40} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};
export default OverviewChart;

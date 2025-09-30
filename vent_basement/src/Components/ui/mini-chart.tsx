import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/shadcn-base/card"
import { type ChartConfig } from "@/Components/shadcn-base/chart"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/Components/shadcn-base/chart"

export const description = "An area chart with gradient fill"
const chartData = [
  { month: "Пн", desktop: 57, mobile: 47 },
  { month: "Вт", desktop: 34, mobile: 55 },
  { month: "Ср", desktop: 21, mobile: 57 },
  { month: "Чт", desktop: 83, mobile: 43 },
  { month: "Пт", desktop: 53, mobile: 80 },
  { month: "Сб", desktop: 56, mobile: 91 },
  { month: "Вс", desktop: 56, mobile: 91 },
]
const chartConfig = {
  desktop: {
    label: "Д1 (пол)",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Д2 (подвал)",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig
export function ChartAreaGradient() {
  return (
    <Card style={{ width: '600px', height: '400px' }} >
      <CardHeader>
        <CardTitle>Показатели влажности (%)</CardTitle>
        <CardDescription>
          За последнюю неделю
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
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
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              fillOpacity={0.4}
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              fillOpacity={0.4}
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
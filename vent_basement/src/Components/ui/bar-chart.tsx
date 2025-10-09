import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../shadcn-base/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "../shadcn-base/chart"

export const description = "Температура"

const chartData = [
  { day: "Понедельник", desktop: 186, mobile: 80 },
  { day: "Вторник", desktop: 305, mobile: 200 },
  { day: "Среда", desktop: 237, mobile: 120 },
  { day: "Четверг", desktop: 73, mobile: 190 },
  { day: "Пятница", desktop: 209, mobile: 130 },
  { day: "Суббота", desktop: 214, mobile: 140 },
  { day: "Воскресенье", desktop: 150, mobile: 100 }, 
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

export function ChartBarMultiple() {
  return (
      <Card>
      <CardHeader>
        <CardTitle>Температура (°C)</CardTitle>
        <CardDescription>Понедельник - Воскресенье</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar
              dataKey="desktop"
              fill="var(--color-desktop)"
              stroke="var(--color-desktop)"
              strokeWidth={1}
              fillOpacity={0.5}
              radius={4}
            />
            <Bar
              dataKey="mobile"
              fill="var(--color-mobile)"
              stroke="var(--color-mobile)"
              strokeWidth={1}
              fillOpacity={0.5}
              radius={4}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
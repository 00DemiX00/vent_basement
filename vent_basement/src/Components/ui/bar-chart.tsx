import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../shadcn-base/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "../shadcn-base/chart"
import { useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchTemperatureData } from "@/Redux/slices/temperatureSlice"
import type { RootState, AppDispatch } from "@/Redux/store/store"
import { useAppDispatch } from "@/Redux/store/store"
export const description = "Температура"

const chartConfig = {
  floorTemp: {
    label: "Д1 (пол)",
    color: "var(--chart-1)",
  },
  basementTemp: {
    label: "Д2 (подвал)",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartBarMultiple() {
  const dispatch: AppDispatch = useAppDispatch()
  const { data: temperatureData, status, error } = useSelector((state: RootState) => state.temperature)
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTemperatureData())
    }
  }, [dispatch, status])

  // Преобразуем данные к нужному формату
  const chartData = temperatureData.map((item: { date: string; floorTemp: number; basementTemp: number }) => ({
    day: item.date,
    floorTemp: item.floorTemp,
    basementTemp: item.basementTemp
  }))
  if (status === 'loading') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Температура (°C)</CardTitle>
          <CardDescription>Последние 7 дней</CardDescription>
        </CardHeader>
        <CardContent>
          <div>Загрузка данных...</div>
        </CardContent>
      </Card>
    )
  }

  if (status === 'failed') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Температура (°C)</CardTitle>
          <CardDescription>Последние 7 дней</CardDescription>
        </CardHeader>
        <CardContent>
          <div>Ошибка загрузки: {error}</div>
        </CardContent>
      </Card>
    )
  }

  return (
      <Card>
      <CardHeader>
        <CardTitle>Температура (°C)</CardTitle>
        <CardDescription>Последние 7 дней</CardDescription>
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
              dataKey="floorTemp"
              fill="var(--chart-1)"
              stroke="var(--chart-1)"
              strokeWidth={1}
              fillOpacity={0.5}
              radius={4}
            />
            <Bar
              dataKey="basementTemp"
              fill="var(--chart-2)"
              stroke="var(--chart-2)"
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
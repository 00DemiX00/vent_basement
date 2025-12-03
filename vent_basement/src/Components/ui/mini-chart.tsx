import * as React from "react";
import { useEffect } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/shadcn-base/card"
import { type ChartConfig } from "@/Components/shadcn-base/chart"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/Components/shadcn-base/chart"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/Redux/store/store"
import { fetchTemperatureData } from "@/Redux/slices/temperatureSlice"


const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const days = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
  const dayName = days[date.getDay()]
  const dayNumber = date.getDate()
  const month = date.toLocaleString('ru-RU', { month: 'short' })
  return `${dayName} ${dayNumber} ${month}`
}

const chartConfig = {
  floorTemp: {
    label: "Температура (пол)",
    color: "var(--chart-1)",
  },
  basementTemp: {
    label: "Температура (подвал)",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig
export const ChartAreaGradient = React.memo(function ChartAreaGradient() {
  const dispatch = useDispatch<AppDispatch>();
  const chartData = useSelector((state: RootState) => state.temperature.data);

  useEffect(() => {
    dispatch(fetchTemperatureData());
  }, [dispatch]);

  if (!chartData.length) {
    return <div>Загрузка данных...</div>;
  }
  return (
    <Card className="w-full h-[400px]">
      <CardHeader>
        <CardTitle>Показатели температуры (°C)</CardTitle>
        <CardDescription>
          За последнюю неделю (пол и подвал)
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
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={formatDate}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillFloor" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-1)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--chart-1)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillBasement" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--chart-2)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--chart-2)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="basementTemp"
              type="natural"
              fill="url(#fillBasement)"
              fillOpacity={0.4}
              stroke="var(--chart-2)"
              stackId="a"
            />
            <Area
              dataKey="floorTemp"
              type="natural"
              fill="url(#fillFloor)"
              fillOpacity={0.4}
              stroke="var(--chart-1)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
})
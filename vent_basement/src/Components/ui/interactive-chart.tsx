import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../shadcn-base/card"
import { type ChartConfig, ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "../shadcn-base/chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../shadcn-base/select"
import { useDispatch, useSelector } from 'react-redux'
import { fetchHumidityData } from '../../Redux/slices/interactiveChartSlice'
import { type AppDispatch } from "@/Redux/store/store"

function getDateRangeBasedOnTimeRange(timeRange: string): { from: Date; to: Date } {
  // Временная фиксация даты для тестирования с данными за 2024 год
  const to = new Date('2024-12-01'); // Фиксированная дата вместо текущей
  let daysBack = 90; // по умолчанию 90 дней

  if (timeRange === '30d') {
    daysBack = 30;
  } else if (timeRange === '7d') {
    daysBack = 7;
  }

  const from = new Date(to);
  from.setDate(to.getDate() - daysBack);
  return { from, to };
}

const chartConfig = {
  visitors: {
    label: "Влажность",
  },
  desktop: {
    label: "Д2 (подвал)",
    color: "var(--chart-2)",
  },
  mobile: {
    label: "Д1 (пол)",
    color: "var(--chart-1)",
  },
  fan1: { label: "Вентилятор 1", },
  fan2: { label: "Вентилятор 2", },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = React.useState("90d")
  const dispatch = useDispatch<AppDispatch>();
  const { data, status, error } = useSelector((state: any) => state.humidity);
  
  React.useEffect(() => {
    const { from, to } = getDateRangeBasedOnTimeRange(timeRange);
    dispatch(fetchHumidityData({ from: from.toISOString(), to: to.toISOString() }));
  }, [timeRange, dispatch]);

  if (status === 'loading') {
    return <div>Загрузка данных...</div>;
  }

  if (status === 'failed') {
    return <div>Ошибка: {error}</div>;
  }

  const { from: rangeFrom, to: rangeTo } = getDateRangeBasedOnTimeRange(timeRange);
  
  const filteredData = data.filter((item: any) => {
    const itemDate = new Date(item.date);
    return itemDate >= rangeFrom && itemDate <= rangeTo;
  });

  const transformedData = filteredData.map((item: any) => ({
    ...item,
    fan1: item.fan1 === "on" ? 1 : 0,
    fan2: item.fan2 === "on" ? 1 : 0,
  }));
  return (
    <Card className="aspect-auto w-[950px]">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Показатели влажности (%)</CardTitle>
          <CardDescription>
            С обоих датчиков за период времени 
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              3 месяца
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              30 дней
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
               7 дней
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px]">
          
          <AreaChart data={transformedData}>
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
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("ru", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("ru", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <Area
              yAxisId="rightFan"
              type="step"
              dataKey="fan1"
              stroke="#0008ff96"
              strokeDasharray="4 2"
              strokeOpacity={0.6}   
              fill="rgba(0, 0, 250, 0.15)" 
            />
            <Area
              yAxisId="rightFan"
              type="step"
              dataKey="fan2"
              stroke="#33ff0071"
              strokeDasharray="4 2"
              strokeOpacity={0.6}
              fill="rgba(0, 255, 0, 0.1)"
            />
          <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

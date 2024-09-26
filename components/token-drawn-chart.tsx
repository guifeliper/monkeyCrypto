"use client"

import { PercentageByGroup } from "@/types/tokenDrawn"
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface TokenDrawnChartProps {
  data: PercentageByGroup<string>[]
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="w-44 rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-4">
          <h3 className="text-lg font-semibold leading-none tracking-tight">
            {label}
          </h3>
        </div>
        {payload.map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-1.5 p-2 text-center"
          >
            <p className="text-sm text-muted-foreground">{item.name}:</p>
            <p className="align-middle text-lg font-medium leading-none">
              {item.value}%
            </p>
          </div>
        ))}
      </div>
    )
  }

  return null
}

export function TokenDrawnChart({ data }: TokenDrawnChartProps) {
  return (
    <ResponsiveContainer width="100%" height={450}>
      <BarChart data={data}>
        <XAxis
          dataKey="timeframe"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />
        <Tooltip
          cursor={{ fill: "#6B7280", opacity: "10%" }}
          content={CustomTooltip}
        />
        <Legend />
        <Bar
          dataKey="monkey"
          name="Monkey"
          fill="#02A7D3"
          unit="number"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="bitcoin"
          name="Bitcoin"
          fill="#043C96"
          unit="number"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

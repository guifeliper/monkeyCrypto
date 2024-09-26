"use client"
import { PureComponent } from "react"
import { Cell, Pie, PieChart } from "recharts"

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group E", value: 100 },
  { name: "Group F", value: 150 },
  { name: "Group G", value: 230 },
]
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#E74C3C",
  "#F7DC6F",
  "#8E44AD",
  "#00FF00",
  "#4C1C00",
  "#9B59B6",
  "#FF5733",
  "#3498DB",
  "#2ECC71",
  "#F1C40F",
  "#7F8C8D",
]

 


export class HoldingsPieChart extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/pie-chart-with-padding-angle-7ux0o"

  render() {
    return (
      <PieChart width={350} height={200}>
        <Pie
          data={data}
          cx={120}
          cy={100}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    )
  }
}

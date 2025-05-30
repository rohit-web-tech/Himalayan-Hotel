import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getChartThemeColor } from "../lib/ChartTheme";

const data = [
  { year: 2019, Germany: 4203764, England: 2780990, India: 4176609 },
  { year: 2020, Germany: 2771016, England: 1623395, India: 2933044 },
  { year: 2021, Germany: 2846735, England: 1873890, India: 3400441 },
  { year: 2022, Germany: 2777617, England: 1896763, India: 4244343 },
  { year: 2023, Germany: 2992696, England: 2241567, India: 4386120 },
];

const SalesOverviewChart = () => {

  return (
    <div className="w-full h-full text-sm">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" stroke={getChartThemeColor()}/>
          <YAxis
            tickFormatter={(tick) => `${(tick / 1000000).toFixed(1)}M`}
            stroke={getChartThemeColor()}
          />
          <Tooltip
            formatter={(value:number) => `${(value / 1000000).toFixed(1)}M`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="Germany"
            stroke="#17c1e8"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="England"
            stroke="#17c109"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line
            type="monotone"
            dataKey="India"
            stroke="#3476eb"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesOverviewChart;
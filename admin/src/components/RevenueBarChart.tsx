import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useGlobalContext } from "../contexts/GlobalContext";
import { getChartThemeColor } from "../lib/ChartTheme";

const data = [
  { year: "2019", revenue: 12000 },
  { year: "2020", revenue: 13500 },
  { year: "2021", revenue: 14000 },
  { year: "2022", revenue: 11000 },
  { year: "2023", revenue: 12948.78 },
];

const RevenueBarChart = () => {
  const {themeColor} = useGlobalContext()
  return (
    <div style={{ width: "100%", height: "150px" }}>
      <ResponsiveContainer>
        <BarChart data={data} className="text-xs">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" stroke={getChartThemeColor()}/>
          <YAxis stroke={getChartThemeColor()} />
          <Tooltip />
          <Legend />
          <Bar dataKey="revenue" fill={themeColor} name="Revenue" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueBarChart;


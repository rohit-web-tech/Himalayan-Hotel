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
  { year: "2022", budget: 31000, expense: 15000 },
  { year: "2023", budget: 32000, expense: 16000 },
  { year: "2024", budget: 30438, expense: 17487 },
];

const BarChartComponent = () => {

    const {themeColor} = useGlobalContext();

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <ResponsiveContainer>
        <BarChart data={data} className="text-xs">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" stroke={getChartThemeColor()}/>
          <YAxis stroke={getChartThemeColor()}/>
          <Tooltip />
          <Legend />
          <Bar dataKey="budget" fill="#9ca3af" name="Budget" />
          <Bar dataKey="expense" fill={themeColor} name="Expense" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;


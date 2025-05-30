import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts";

const data = [
  { year: "2020", sales: 8000 },
  { year: "2021", sales: 9500 },
  { year: "2022", sales: 12000 },
  { year: "2023", sales: 9500 },
  { year: "2024", sales: 8236 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#a4de6c"];

const SalesPieChart = () => {
  return (
    <div style={{ width: "100%", height: "200px" }}>
      <ResponsiveContainer>
        <PieChart className="text-xs">
          <Pie
            data={data}
            dataKey="sales"
            nameKey="year"
            cx="50%"
            cy="50%"
            outerRadius={40}
            fill="#8884d8"
            label={(entry) => `${entry.year}: ${entry.sales}`}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesPieChart;

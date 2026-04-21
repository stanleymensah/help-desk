import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function TicketsByPriorityChart({ data }) {
  const COLORS = ["#14b8a6", "#f59e0b", "#ef4444"];
  const hasData = data.some((item) => item.value > 0);

  if (!hasData) {
    return (
      <div className="min-w-[300px] h-[300px] flex items-center justify-center text-gray-500 text-sm">
        No priority data yet.
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-start gap-4">
      <h2 className="text-lg font-medium w-full px-2">Priority</h2>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={80}
            innerRadius={45}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#007a55",
              border: "none",
              fontSize: 11,
              fontWeight: "light",
            }}
            labelStyle={{
              color: "white",
            }}
            itemStyle={{
              color: "white",
            }}
            formatter={(value) => [`${value}`, "Tickets"]}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

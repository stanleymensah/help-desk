import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function TicketsByStatusChart({ data }) {
  const COLORS = [
    "#eab308",
    "#3b82f6",
    "#f97316",
    "#22c55e",
    "#6b7280",
    "#a855f7",
  ];
  const hasData = data.some((item) => item.count > 0);

  if (!hasData) {
    return (
      <div className="min-w-[300px] flex items-center justify-center text-gray-500 text-sm">
        No status data yet.
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4 items-center">
      <h2 className="font-medium w-full px-2">Status</h2>
      <ResponsiveContainer height={300} width="80%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 5, left: -10, bottom: 5 }}
        >
          <XAxis
            dataKey="status"
            tick={{ fontSize: 11, dy: 10 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fontSize: 11, dy: -5, dx: -5 }}
            width={35}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#007a55",
              border: "none",
              fontSize: 11,
              fontWeight: "light",
              color: "white"
            }}
            labelStyle={{
              color: "white",
            }}
            itemStyle={{
              color: "white",
            }}
            formatter={(value) => [`${value}`, "Tickets"]}
            cursor={false}
          />
          <Bar
            dataKey="count"
            background={{ fill: "#e6e6e6", radius: [6, 6, 6, 6] }}
            radius={[6, 6, 6, 6]}
            barSize={35}
          >
            {data.map((entry, index) => (
              <Cell key={entry.status} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

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
  const COLORS = ["#3b82f6", "#f59e0b", "#22c55e"];
  const hasData = data.some((item) => item.count > 0);

  if (!hasData) {
    return (
      <div className="min-w-[300px] flex items-center justify-center text-gray-500 text-sm">
        No status data yet.
      </div>
    );
  }

  return (
    <div className="min-w-[300px]">
      <h2 className="text-xl font-bold mb-4">Tickets by Status</h2>
      <ResponsiveContainer width="100%" height={270}>
        <BarChart data={data}>
          <XAxis dataKey="status" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value) => [`${value}`, "Tickets"]} />
          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={entry.status} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

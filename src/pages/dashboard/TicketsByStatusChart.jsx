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
  const COLORS = ["#eab308", "#3b82f6", "#f97316", "#22c55e", "#6b7280", "#a855f7"];
  const hasData = data.some((item) => item.count > 0);

  if (!hasData) {
    return (
      <div className="min-w-[300px] flex items-center justify-center text-gray-500 text-sm">
        No status data yet.
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-start">
      <h2 className="text-lg font-medium mb-2">Tickets by Status</h2>
      <ResponsiveContainer height={300} width="100%">
        <BarChart data={data} margin={{ top: 5, right: 5, left: -10, bottom: 5 }}>
          <XAxis dataKey="status" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} width={35} />
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

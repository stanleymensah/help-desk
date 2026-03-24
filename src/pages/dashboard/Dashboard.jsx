import useTickets from "../../hooks/useTickets";
import { useTicketStats } from "../../hooks/useTicketStats";
import Loader from "../../components/common/Loader";
import StatsCards from "../../components/dashboard/StatsCards";
import ChartsSection from "../../components/dashboard/ChartsSection";

export default function Dashboard() {

  const { data: tickets = [], isPending, error } = useTickets();
  const stats = useTicketStats(tickets);

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  if (isPending) {
    return (
      <div className="w-full flex justify-center items-center">
        <Loader name="Loading dashboard" />
      </div>
    );
  }

  return (
    <div className="text-xs flex flex-col gap-6">
      <div className="flex flex-col">
        <span className="text-lg font-semibold">Dashboard</span>
        <span>
          Welcome back! Here's what is going on with your ticketing so far.
        </span>
      </div>
      <StatsCards stats={stats} />
      <ChartsSection stats={stats} />
    </div>
  );
}

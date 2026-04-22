import useTickets from "../../hooks/useTickets";
import { useTicketStats } from "../../hooks/useTicketStats";
import Loader from "../../components/common/Loader";
import StatsCards from "../../components/dashboard/StatsCards";
// import { useUsers } from "@/context/UsersContext";
import ChartsSection from "../../components/dashboard/ChartsSection";

export default function Dashboard() {
  const { data: tickets = [], isPending, error } = useTickets();
  // const { currentUser } = useUsers();
  const stats = useTicketStats(tickets);

  if (error) {
    return <div className="text-red-500">Error: {error.message}</div>;
  }

  if (isPending) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        <Loader name="Loading dashboard" />
      </div>
    );
  }

  return (
    <div className="text-xs flex flex-col gap-4 px-4">
      {/* <div className="flex flex-col">
        <span className="text-2xl font-semibold">Dashboard</span>
        <span className="text-sm">
          Welcome <strong>{currentUser?.fullName ?? "User"}</strong>! Here's what is going on with your ticketing so far.
        </span>
      </div> */}

      <StatsCards stats={stats} />
      <ChartsSection stats={stats} />
    </div>
  );
}

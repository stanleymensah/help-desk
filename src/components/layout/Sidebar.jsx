import Dropdown from "../common/Dropdown";
import { RxDashboard } from "react-icons/rx";
import { LuTickets } from "react-icons/lu";

export default function Sidebar() {
  return (
    <>
      <div className="sidebar border-e border-e-primary h-full p-2 bg-dim">
        <div className="container p-2 flex flex-col gap-3">
          {/* SELECTED */}
          <Dropdown
            icon={<RxDashboard size={16} />}
            name="Dashboard"
            items={[
              { label: "Overview", path: "/" },
              // { label: "Settings", path: "/settings" },
            ]}
          />

          {/* NORMAL */}
          <Dropdown
            icon={<LuTickets />}
            name="Tickets"
            items={[
              // { label: "Create ticket", path: "/tickets/new" },
              { label: "All tickets", path: "/tickets" },
              { label: "Open tickets", path: "/tickets/open" },
              { label: "In-progress", path: "/tickets/in-progress" },
              { label: "Resolved", path: "/tickets/resolved" },
              { label: "High", path: "/tickets/high" },
              { label: "Medium", path: "/tickets/medium" },
              { label: "Low", path: "/tickets/low" },
            ]}
          />
        </div>
      </div>
    </>
  );
}

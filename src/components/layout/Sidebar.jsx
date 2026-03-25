import { NavLink } from "react-router-dom";
import { ChevronLeft, ChevronRight, LayoutDashboard, Ticket } from "lucide-react";
import { useState } from "react";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(true);
  
  const linkStyle = ({ isActive }) =>
    `flex items-center gap-3 p-2 rounded-md text-xs transition whitespace-nowrap
    ${isActive ? "bg-primary text-white" : "hover:bg-gray-200 text-gray-700"}`;

  return (
    <>
      {/* Backdrop - only show when expanded */}
      {!collapsed && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 top-12"
          onClick={() => setCollapsed(true)}
        />
      )}

      {/* Sidebar - Fixed position, starts below header (top-12) */}
      <div
        className={`fixed top-12 left-0 h-[calc(100vh-3rem)] bg-dim border-e border-e-primary p-2 transition-all duration-300 z-50 ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        <div className="flex flex-col gap-1 p-2">
          <NavLink to="/" className={linkStyle} onClick={() => setCollapsed(true)}>
            <LayoutDashboard size={18} className="flex-shrink-0" />
            {!collapsed && <span>Overview</span>}
          </NavLink>

          <NavLink to="/tickets" className={linkStyle} onClick={() => setCollapsed(true)}>
            <Ticket size={18} className="flex-shrink-0" />
            {!collapsed && <span>All Tickets</span>}
          </NavLink>
        </div>

        {/* Toggle button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-6 bg-primary text-white p-1 rounded-full cursor-pointer shadow-md hover:scale-105 transition z-10"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Spacer - keeps content from going under collapsed sidebar */}
      <div className="w-16 flex-shrink-0" />
    </>
  );
}
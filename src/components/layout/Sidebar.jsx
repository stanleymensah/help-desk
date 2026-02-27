import { NavLink } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { PiTicket } from "react-icons/pi";
import { useState } from "react";
import { LuRepeat } from "react-icons/lu";
import { AiOutlineStop } from "react-icons/ai";
import { IoLayersOutline } from "react-icons/io5";
import { HiMiniChevronUp } from "react-icons/hi2";
import { HiMiniChevronDown } from "react-icons/hi2";
import { HiMiniEquals } from "react-icons/hi2";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const linkStyle = ({ isActive }) =>
    `flex items-center gap-3 p-2 rounded-md text-xs transition
    ${isActive ? "bg-primary text-white" : "hover:bg-gray-200 text-gray-700"}`;

  return (
    <div className="relative text-xs">
      {/* Sidebar */}
      <div
        className={`bg-dim border-e border-e-primary h-full p-2 transition-all duration-300 ${
          collapsed ? "w-16" : "w-64"
        }`}
      >
        <div className="flex flex-col gap-1 p-2">
          {/* Dashboard */}
          <NavLink to="/" className={linkStyle}>
            <RxDashboard size={18} />
            {!collapsed && <span>Overview</span>}
          </NavLink>

          {/* All Tickets */}
          <NavLink to="/tickets" className={linkStyle}>
            <IoLayersOutline size={18} />
            {!collapsed && <span>All Tickets</span>}
          </NavLink>

          {/* Open */}
          <NavLink to="/tickets/open" className={linkStyle}>
            <PiTicket size={18} />
            {!collapsed && <span>Open Tickets</span>}
          </NavLink>

          {/* In Progress */}
          <NavLink to="/tickets/in-progress" className={linkStyle}>
            <LuRepeat size={18} />
            {!collapsed && <span>In-Progress</span>}
          </NavLink>

          {/* Resolved */}
          <NavLink to="/tickets/resolved" className={linkStyle}>
            <AiOutlineStop size={18} />
            {!collapsed && <span>Resolved</span>}
          </NavLink>

          {/* High Priority */}
          <NavLink to="/tickets/high" className={linkStyle}>
            <HiMiniChevronUp size={18} />
            {!collapsed && <span>High</span>}
          </NavLink>

          {/* Medium Priority */}
          <NavLink to="/tickets/medium" className={linkStyle}>
            <HiMiniEquals size={18} />
            {!collapsed && <span>Medium</span>}
          </NavLink>

          {/* Low Priority */}
          <NavLink to="/tickets/low" className={linkStyle}>
            <HiMiniChevronDown size={18} />
            {!collapsed && <span>Low</span>}
          </NavLink>

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="absolute -right-3 top-6 bg-primary text-white p-1 rounded-full cursor-pointer shadow-md hover:scale-105 transition"
          >
            {collapsed ? <HiOutlineChevronRight size={20} /> : <HiOutlineChevronLeft size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}

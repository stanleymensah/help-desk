import { NavLink } from "react-router-dom";
import { LayoutDashboard, Ticket } from "lucide-react";
import {
  Sidebar as AppSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "../ui/sidebar";

const NAV_ITEMS = [
  {
    to: "/",
    label: "Overview",
    icon: LayoutDashboard,
    end: true,
  },
  {
    to: "/tickets",
    label: "All Tickets",
    icon: Ticket,
  },
];

export default function Sidebar() {
  return (
    <AppSidebar
      collapsible="icon"
      className="top-12 h-[calc(100svh-3rem)] border-r border-primary"
    >
      <SidebarContent className="bg-[#212529]">
        <SidebarGroup className="pt-3">
          <SidebarMenu>
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;

              return (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild tooltip={item.label} className="text-sm bg-transparent hover:bg-gray-200 mb-1 py-5">
                    <NavLink
                      to={item.to}
                      end={item.end}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-primary text-white hover:bg-primary"
                          : "text-gray-700 hover:bg-gray-200"
                      }
                    >
                      <Icon size={18} className="shrink-0" />
                      <span>{item.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </AppSidebar>
  );
}
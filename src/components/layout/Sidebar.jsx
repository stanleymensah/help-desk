import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Gauge, LogOut, Ticket, Users } from "lucide-react";
import { useUsers } from "@/context/UsersContext";
import {
  Sidebar as AppSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "../ui/sidebar";

const NAV_ITEMS = [
  {
    to: "/overview",
    label: "Overview",
    icon: Gauge,
    end: true,
  },
  {
    to: "/tickets",
    label: "All Tickets",
    icon: Ticket,
  },
  {
    to: "/users",
    label: "Users",
    icon: Users,
  }
];

export default function Sidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { handleLogout } = useUsers();

  const onLogout = () => {
    handleLogout();
    navigate("/", { replace: true });
  };

  return (
    <>
    <AppSidebar
      collapsible="icon"
      className="top-12 h-[calc(100svh-3rem)] border-r border-primary"
    >
      <SidebarContent className="bg-[#212529]">
        <SidebarGroup className="pt-3">
          <SidebarMenu>
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = item.end
                ? pathname === item.to
                : pathname.startsWith(item.to);

              return (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.label}
                    className={`text-sm mb-1 py-5 ${
                      isActive
                        ? "bg-[#fff] hover:bg-gray-200"
                        : "bg-[#212529] hover:bg-gray-700"
                    }`}
                  >
                    <NavLink to={item.to} end={item.end}>
                      <Icon
                        size={18}
                        className={`shrink-0 ${isActive ? "text-black" : "text-white"}`}
                      />
                      <span className={isActive ? "text-black" : "text-white"}>
                        {item.label}
                      </span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="bg-[#212529] p-2 pt-0">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={onLogout}
              tooltip="Logout"
              className="text-sm mb-1 py-5 bg-[#212529] hover:bg-gray-700"
            >
              <LogOut size={18} className="shrink-0 text-white" />
              <span className="text-white">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </AppSidebar>
    </>
  );
}
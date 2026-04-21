import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Gauge, LogOut, Ticket, UsersRound } from "lucide-react";
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
    icon: UsersRound,
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
      className="top-12 h-[calc(100svh-3rem)] border-r border-border"
    >
      <SidebarContent className="bg-sidebar">
        <SidebarGroup className="p-0">
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
                    className={`text-sm py-6 pl-4 ${
                      isActive
                        ? "border-e-2 border-black bg-gray-300 hover:bg-gray-400 dark:border-white dark:bg-[#2b2b2b] dark:hover:bg-[#343434] dark:text-white"
                        : "bg-transparent hover:bg-gray-400 dark:hover:bg-[#343434] dark:text-[#e6e6e6]"
                    }`}
                  >
                    <NavLink to={item.to} end={item.end}>
                      <Icon
                        size={18}
                        className={`shrink-0 ${isActive ? "text-black dark:text-white" : "text-gray-700 dark:text-[#e6e6e6]"}`}
                      />
                      <span
                        className={`${isActive ? "font-medium text-black dark:text-white" : "font-light text-gray-700 dark:text-[#e6e6e6]"}`}
                      >
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

      <SidebarFooter className="bg-transparent p-0 border-t border-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={onLogout}
              tooltip="Logout"
              className="text-sm py-6 pl-4 bg-transparent hover:bg-gray-400 text-gray-700 dark:text-[#e6e6e6] dark:hover:bg-[#343434]"
            >
              <LogOut size={18} className="shrink-0 text-gray-700 dark:text-[#e6e6e6]" />
              <span className="font-light text-gray-700 dark:text-[#e6e6e6]">Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </AppSidebar>
    </>
  );
}
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import TicketsPage from "../pages/tickets/TicketsPage";
import Layout from "../components/layout/Layout";
import Settings from "../pages/settings/Settings";
import Profile from "../pages/profile/Profile";
import Auth from "../pages/auth/Auth";
import Users from "@/pages/users/users";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {
    element: <Layout />,
    children: [
      { path: "/overview", element: <Dashboard /> },
      { path: "/tickets", element: <TicketsPage /> },
      { path: "/profile", element: <Profile /> },
      { path: "/settings", element: <Settings /> },
      { path: "/users", element: <Users /> },
    ],
  },
]);

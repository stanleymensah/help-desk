import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import TicketsPage from "../pages/tickets/TicketsPage";
import Layout from "../components/layout/Layout";
import CreateTicketPage from "../pages/tickets/CreateTicketPage";
import Settings from "../pages/settings/Settings";
import Profile from "../pages/profile/Profile";
import Auth from "../pages/auth/Auth";

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/tickets", element: <TicketsPage /> },
      { path: "/tickets/new", element: <CreateTicketPage /> },
      { path: "/profile", element: <Profile /> },
      { path: "/settings", element: <Settings /> },
    ],
  },
]);

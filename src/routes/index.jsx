import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import TicketsPage from "../pages/tickets/TicketsPage";
import Layout from "../components/layout/Layout";
import CreateTicketPage from "../pages/tickets/CreateTicketPage";
import Settings from "../pages/settings/Settings";
import Profile from "../pages/profile/Profile";
import Auth from "../pages/auth/Auth";
import OpenTickets from "../pages/tickets/sub-pages/OpenTickets";
import InProgressTickets from "../pages/tickets/sub-pages/InProgressTickets";
import ResolvedTickets from "../pages/tickets/sub-pages/ResolvedTickets";
import HighTicket from "../pages/tickets/sub-pages/HighTicket";
import MediumTicket from "../pages/tickets/sub-pages/MediumTicket";
import LowTicket from "../pages/tickets/sub-pages/LowTicket";

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
      { path: "/tickets/open", element: <OpenTickets /> },
      { path: "/tickets/in-progress", element: <InProgressTickets /> },
      { path: "/tickets/resolved", element: <ResolvedTickets /> },
      { path: "/tickets/high", element: <HighTicket /> },
      { path: "/tickets/medium", element: <MediumTicket /> },
      { path: "/tickets/low", element: <LowTicket /> },
      { path: "/tickets/new", element: <CreateTicketPage /> },
      { path: "/profile", element: <Profile /> },
      { path: "/settings", element: <Settings /> },
    ],
  },
]);

import { router } from "./routes";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { TooltipProvider } from "./components/ui/tooltip";
import { SidebarProvider } from "./components/ui/sidebar";
import { TicketProvider } from "./context/TicketContext";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TicketProvider>
          <SidebarProvider>
            <TooltipProvider>
              <ToastContainer
                hideProgressBar
                position="top-center"
                autoClose={2000}
              />
              <RouterProvider router={router} />
            </TooltipProvider>
          </SidebarProvider>
        </TicketProvider>
      </QueryClientProvider>
    </>
  );
}

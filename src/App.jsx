import { router } from "./routes";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { SidebarProvider } from "./components/ui/sidebar";
import { TicketProvider } from "./context/TicketContext";
import { UserProvider } from "./context/UsersContext";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <TicketProvider>
            <SidebarProvider>
              <TooltipProvider>
                <Toaster richColors position="bottom-right" />
                <RouterProvider router={router} />
              </TooltipProvider>
            </SidebarProvider>
          </TicketProvider>
        </UserProvider>
      </QueryClientProvider>
    </>
  );
}

import { router } from "./routes";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { TooltipProvider } from "./components/ui/tooltip";
import { SidebarProvider } from "./components/ui/sidebar";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </>
  );
}

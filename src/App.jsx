import { router } from "./routes";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "./context/ThemeContext";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <ToastContainer position="top-center" autoClose={2000} />
        <RouterProvider router={router} />
        </ThemeProvider>        
      </QueryClientProvider>
    </>
  );
}

import { router } from "./routes";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer hideProgressBar position="top-center" autoClose={2000} />
          <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
}

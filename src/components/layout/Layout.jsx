import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="w-lvwh overflow-x-hidden">
      <Header />

      <main className="flex min-h-screen">
        <Sidebar />

        <div className="overflow-x-none flex-1 p-3 bg-dim">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
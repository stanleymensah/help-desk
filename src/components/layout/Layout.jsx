import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <>
      <Header />

      <main className="flex h-[calc(100vh-64px)]">
        <Sidebar />

        <div className="flex-1 overflow-auto p-3 bg-dim">
          <Outlet />
        </div>
      </main>
    </>
  );
}
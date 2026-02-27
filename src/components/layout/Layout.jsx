import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <div className="w-full h-screen overflow-hidden flex flex-col">
      {/* Fixed Header */}
      <Header />

      {/* Main area - scrollable */}
      <main className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content - ONLY THIS SCROLLS */}
        <div className="flex-1 p-3 bg-dim overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
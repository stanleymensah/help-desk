import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
    <>
      <Header />
      <main className="flex h-lvh">
        <div className="left w-15/100">
          <Sidebar />
        </div>

        <div className="right overflow-auto w-85/100 p-3 bg-dim">
            <Outlet />
        </div>
      </main>

      {/* <Footer /> */}
    </>
  );
}

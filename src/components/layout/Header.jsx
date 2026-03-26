// src/components/layout/Header.jsx
import helpdeskLogo from "../../assets/icons/helpdesk.png";
import { Link } from "react-router-dom";
import { PrimaryButton } from "../common/Button";
import { SidebarTrigger } from "../ui/sidebar";

export default function Header({creatingTicket}) {
  const handleCreateTicket = () => {
    creatingTicket?.();
  };

  return (
    <header className="h-12 bg-primary text-white text-xs w-full px-4 flex items-center">
      <div className="container flex justify-between items-center w-full">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <SidebarTrigger className="text-white hover:bg-primary-dark hover:text-white" />
          <Link to="/" className="flex items-center gap-2">
            <img src={helpdeskLogo} alt="logo" className="w-5 h-5" />
            <h1 className="hidden sm:block text-lg uppercase font-bold">
              HelpDesk
            </h1>
          </Link>
        </div>


        <div className="flex items-center gap-2">
          <div>
            <button
              onClick={handleCreateTicket}
              className="sm:hidden px-3 rounded bg-white text-primary cursor-pointer font-bold text-lg"
            >
              +
            </button>

            <div className="hidden md:block">
              <PrimaryButton
                name="Create Ticket"
                doWhat={handleCreateTicket}
                className="hidden sm:inline-block"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

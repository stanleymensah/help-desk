// src/components/layout/Header.jsx
import helpdeskLogo from "../../assets/icons/helpdesk.png";
import { Link } from "react-router-dom";
import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";

export default function Header({creatingTicket}) {
  const handleCreateTicket = () => {
    creatingTicket?.();
  };

  return (
    <header className="h-12 bg-primary text-white text-xs w-full px-4 flex items-center">
      <div className="container flex justify-between items-center w-full">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img src={helpdeskLogo} alt="logo" className="w-5 h-5" />
            <h1 className="hidden sm:block text-lg uppercase font-bold">
              HelpDesk
            </h1>
          </Link>
          <SidebarTrigger className="text-white hover:bg-primary-dark hover:text-white" />
        </div>


        <div className="flex items-center gap-2">
          <div>
            <Button
              type="button"
              onClick={handleCreateTicket}
              variant="secondary"
              size="icon"
              className="sm:hidden"
            >
              +
            </Button>

            <div className="hidden md:block">
              <Button
                type="button"
                onClick={handleCreateTicket}
                variant="secondary"
                size="sm"
                className="hidden sm:inline-flex"
              >
                Create Ticket
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

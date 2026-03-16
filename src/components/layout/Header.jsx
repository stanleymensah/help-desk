// src/components/layout/Header.jsx
import helpdeskLogo from "../../assets/icons/helpdesk.png";
import { Link } from "react-router-dom";
import { SecondaryButton } from "../common/Button";
// import { useTheme } from "../../context/ThemeContext";

export default function Header() {
  // const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-12 bg-primary text-white text-xs px-4 md:px-6 flex items-center">
      <div className="container flex justify-between items-center w-full">
        {/* Logo */}
        <div>
          <Link to="/" className="flex items-center gap-2">
            <img src={helpdeskLogo} alt="logo" className="w-5 h-5" />
            <h1 className="hidden sm:block text-lg uppercase font-bold">
              HelpDesk
            </h1>
          </Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Theme toggle button */}
          {/* <button
            type="button"
            onClick={toggleTheme}
            className="px-3 py-1 rounded bg-white text-primary text-xs sm:text-sm"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </button> */}

          {/* Create Ticket */}
          <Link to="/tickets/new">
            {/* Mobile "+" button */}
            <button className="sm:hidden px-3 rounded bg-white text-primary cursor-pointer font-bold text-lg">
              +
            </button>

            {/* Desktop full button */}
            <div className="hidden md:block">
              <SecondaryButton
                name="Create Ticket"
                className="hidden sm:inline-block"
              />
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}

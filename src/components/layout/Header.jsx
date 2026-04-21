// import helpdeskLogo from "../../assets/icons/helpdesk.png";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";
import { Moon, Plus, Sun } from "lucide-react";

const THEME_STORAGE_KEY = "helpdesk_theme";

const getInitialTheme = () => {
  try {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (storedTheme === "dark" || storedTheme === "light") {
      return storedTheme;
    }
  } catch {
    // Ignore storage access issues and default to light.
  }

  return "light";
};

export default function Header({ creatingTicket, canCreateTicket }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const isDark = theme === "dark";
    document.documentElement.classList.toggle("dark", isDark);

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore storage write issues.
    }
  }, [theme]);

  const handleCreateTicket = () => {
    if (!canCreateTicket) return;
    creatingTicket?.();
  };

  const handleThemeToggle = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <header className="h-12 bg-background text-foreground text-xs w-full px-4 flex items-center border-b border-border">
      <div className="container flex justify-between items-center w-full">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            {/* <img src={helpdeskLogo} alt="logo" className="w-5 h-5" /> */}
            <h1 className="hidden sm:block text-lg uppercase font-bold">
              HelpDesk
            </h1>
          </Link>
          <SidebarTrigger className="text-foreground hover:cursor-pointer hover:bg-muted hover:text-foreground" />
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            onClick={handleThemeToggle}
            className="rounded-full"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </Button>

          <div>
            <Button
              type="button"
              onClick={handleCreateTicket}
              variant="secondary"
              size="icon"
              className="sm:hidden"
              disabled={!canCreateTicket}
            >
              +
            </Button>

            <div className="hidden md:block">
              <Button
                type="button"
                onClick={handleCreateTicket}
                variant="secondary"
                size="sm"
                className="hidden sm:inline-flex rounded-full bg-secondary text-white"
                disabled={!canCreateTicket}
              >
                <Plus />
                Add New
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

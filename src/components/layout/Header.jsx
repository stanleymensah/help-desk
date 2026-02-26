// import { AiOutlineUser } from "react-icons/ai";
import helpdeskLogo from "../../assets/icons/helpdesk.png";
import { Link } from "react-router-dom";
import { SecondaryButton } from "../common/Button";
import { useTheme } from "../../context/ThemeContext";

export default function Header() {
  const {theme, toggleTheme} = useTheme();
  return (
    <header className="h-12 bg-primary text-white text-xs px-6 py-7 flex items-center justify-center">
      <div className="container flex justify-between items-center">
        <div className="brand flex gap-1 w-2/10 items-center">
          <img src={helpdeskLogo} alt="logo" className="w-5 h-5" />
          <Link to='/'>
          <h1 className="text-lg uppercase font-bold">HelpDesk</h1>
          </Link>
        </div>

        <div className="user w-2/10 flex gap-2 items-center justify-end">
        <button type="button" onClick={toggleTheme} className="px-4 py-2 rounded bg-white text-primary cursor-pointer">Switch to {theme === 'dark' ? 'Light' : 'Dark'}</button>

            <Link to="/tickets/new">
              {/* <img src="#" alt="user profile" /> */}
              {/* <AiOutlineUser size={20} /> */}
              <SecondaryButton name="Create Ticket" />
            </Link>
        </div>
      </div>
    </header>
  );
}

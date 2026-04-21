import { createContext, useContext, useState } from "react";
import { usersData } from "./usersData";

const UserContext = createContext();
const ACTIVE_USER_KEY = "active_user";

const getStoredUser = () => {
  try {
    const storedUser = localStorage.getItem(ACTIVE_USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    return null;
  }
};

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(getStoredUser);

  const handleLogin = (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    const user = usersData.find(
      (u) => u.email.toLowerCase() === normalizedEmail && u.password === normalizedPassword
    );

    if (user) {
      setCurrentUser(user);
      localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify(user));
      return { success: true };
    } else {
      return { success: false, message: "Invalid email or password" };
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem(ACTIVE_USER_KEY);
  };

  const value = {
    handleLogin,
    handleLogout,
    users: usersData,
    currentUser,
  };

  return (
    <>
      <UserContext.Provider value={value}>{children}</UserContext.Provider>
    </>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useUsers = () => useContext(UserContext);

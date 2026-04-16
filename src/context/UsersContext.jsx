import { createContext, useContext, useState } from "react";
import { usersData } from "./usersData";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (email, password) => {
    const user = usersData.find((u) => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem("active_user", JSON.stringify(user));
      return { success: true}
    } else {
      return {success: false, message: 'Invalid email or password'}
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("active_user");
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

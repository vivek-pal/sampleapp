import React, { createContext, useState, useContext } from "react";

const UserContext = createContext(null);
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    userid: "",
    userName: "",
    pegasus: {
      token: "",
      pnr: "",
    },
    isLoggedIn: true,
  });

  const updateUser = (updates) => {
    setUser((prev) => ({
      ...prev,
      ...updates,
      pegasus: {
        ...prev,
        ...updates.pegasus,
      },
    }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
export function useUser() {
  return useContext(UserContext);
}
export default UserContext;

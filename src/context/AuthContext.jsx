import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const updateUser = (data) => {
    // Normalize incoming user shape so UI can read consistent fields.
    // Some API responses return `{ user: {...} }` while others return flat `{ ... }`.
    const normalized = data?.user ?? data;
    setCurrentUser(normalized);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser,updateUser, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

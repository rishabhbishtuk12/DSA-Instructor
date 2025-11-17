import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("auth")) || null;
    } catch {
      return null;
    }
  });

  const login = data => {
    const payload = { token: data.token };
    setUser(payload);
    localStorage.setItem("auth", JSON.stringify(payload));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

import React, { createContext, useEffect, useState } from "react";

const Context = createContext();

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setAuthenticated(true);
    }
  }, []);

  async function handleLogin(token, id) {
    localStorage.setItem("idUser", JSON.stringify(id));
    localStorage.setItem("token", JSON.stringify(token));
    setAuthenticated(true);
  }

  function handleLogout() {
    setAuthenticated(false);
    localStorage.removeItem("idUser");
    localStorage.removeItem("token");
  }

  return (
    <Context.Provider value={{ authenticated, handleLogin, handleLogout }}>
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };

import React, { createContext, useEffect, useState } from "react";
import UserDataService from "../services/user";

const Context = createContext();

function AuthProvider({ children }) {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("idUser");

    if (token) {
      UserDataService.haveFavorites(JSON.parse(id))
        .then((response) => {
          if (response.status === 200) setAuthenticated(true);
        })
        .catch((response) => {
          if (response.response.status === 401) handleLogout();
        });
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

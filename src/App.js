import React, { useState, useEffect } from "react";
import Login from "./pages/login/Login";
import AuthContext from "./contexts/AuthContext";
import TokenContext from "./contexts/TokenContext";
import useSaveToStorage from "./customHooks/useSaveToStorage";
import getItemFromStroage from "./utils/getItemFromStroage";
import "./App.css";

function App() {
  const [auth, setAuth] = useState(getItemFromStroage("auth") || false);

  const [tokenObj, setTokenObj] = useState(
    getItemFromStroage("tokenObj") || {
      token: null,
      lastUpdated: null,
    }
  );

  useSaveToStorage("auth", auth);
  useSaveToStorage("tokenObj", tokenObj);

  const authState = { auth, setAuth };
  const tokenState = { tokenObj, setTokenObj };
  return (
    <AuthContext.Provider value={authState}>
      <TokenContext.Provider value={tokenState}>
        <Login />
      </TokenContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;

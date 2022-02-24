import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/notFound/NotFound";
import Login from "./pages/login/Login";
import Posts from "./pages/posts/Posts";
import Post from "./pages/posts/Post";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
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
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Posts />
              </PrivateRoute>
            }
          />
          <Route
            path="/:id"
            element={
              <PrivateRoute>
                <Post />
              </PrivateRoute>
            }
          />
        </Routes>
      </TokenContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;

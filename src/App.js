import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/notFound/NotFound";
import Login from "./pages/login/Login";
import Posts from "./pages/posts/Posts";
import Post from "./pages/posts/Post";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import AuthContext from "./contexts/AuthContext";
import UserContext from "./contexts/UserContext";
import TokenContext from "./contexts/TokenContext";
import useSaveToStorage from "./customHooks/useSaveToStorage";
import getItemFromStroage from "./utils/getItemFromStroage";
import "./App.css";

function App() {
  const [auth, setAuth] = useState(getItemFromStroage("auth") || false);
  const [currentUser, setCurrentUser] = useState(
    getItemFromStroage("currentUser") || null
  );

  const [tokenObj, setTokenObj] = useState(
    getItemFromStroage("tokenObj") || {
      token: null,
      lastUpdated: null,
    }
  );

  useSaveToStorage("auth", auth);
  useSaveToStorage("currentUser", currentUser);
  useSaveToStorage("tokenObj", tokenObj);

  const authState = { auth, setAuth };
  const tokenState = { tokenObj, setTokenObj };
  const userState = { currentUser, setCurrentUser };
  return (
    <AuthContext.Provider value={authState}>
      <TokenContext.Provider value={tokenState}>
        <UserContext.Provider value={userState}>
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
        </UserContext.Provider>
      </TokenContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;

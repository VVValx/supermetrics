import { createContext } from "react";

const authContext = createContext({
  auth: false,
  setAuth: () => {},
});

export default authContext;

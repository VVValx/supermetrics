import { createContext } from "react";

const tokenContext = createContext({
  currentUser: {
    name: "",
    email: "",
  },

  setCurrentUser: () => {},
});

export default tokenContext;

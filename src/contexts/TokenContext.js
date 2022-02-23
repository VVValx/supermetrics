import { createContext } from "react";

const tokenContext = createContext({
  tokenObj: { token: null, lastUpdated: null },
  setTokenObj: () => {},
});

export default tokenContext;

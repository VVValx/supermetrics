import { useEffect, useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import TokenContext from "../contexts/TokenContext";
import UserContext from "../contexts/UserContext";
import getNewToken from "../utils/getNewToken";

function useGetToken() {
  const [validToken, setValidToken] = useState(null);
  const { auth } = useContext(AuthContext);
  const { currentUser } = useContext(UserContext);
  const { tokenObj, setTokenObj } = useContext(TokenContext);
  const { token, lastUpdated } = tokenObj;

  useEffect(() => {
    setToken();
  }, []);

  const setToken = async () => {
    if (!auth) return;

    const timeDiff = (new Date() - new Date(lastUpdated)) / 1000;
    console.log("timeDiff", timeDiff);

    if (timeDiff < 3600) return setValidToken(token);

    try {
      const token = await getNewToken(currentUser);
      setValidToken(token);
      setTokenObj({ token, lastUpdated: new Date() });
    } catch (error) {
      console.log(error);
    }
  };

  return validToken;
}

export default useGetToken;

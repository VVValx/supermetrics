import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function useCheckAuth(auth) {
  const navigate = useNavigate();
  useEffect(() => auth && navigate("/", { replace: true }), []);
}

export default useCheckAuth;

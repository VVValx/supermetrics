import React, { useEffect } from "react";

function useSaveToStorage(key, state) {
  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state));
  }, [state]);
}

export default useSaveToStorage;

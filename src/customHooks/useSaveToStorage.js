import { useEffect } from "react";

function useSaveToStorage(key, state) {
  useEffect(() => localStorage.setItem(key, JSON.stringify(state)), [state]);
}

export default useSaveToStorage;

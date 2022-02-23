import React, { useState, useEffect } from "react";
import nt from "./ErrorNotification.module.css";

function ErrorNotification({ loginError, time = 3000 }) {
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    if (loginError) setDisplay(true);

    setTimeout(() => setDisplay(false), time);
  }, [loginError]);
  return (
    <div className={`${nt.container} ${display ? nt.show : nt.hide}`}>
      {loginError}
    </div>
  );
}

export default ErrorNotification;

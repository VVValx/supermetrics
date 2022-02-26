import React from "react";
import load from "./LoadingScreen.module.css";

function LoadingScreen() {
  return (
    <div className={load.container}>
      <div className={load.loadType}>
        <div className={`${load.circle} ${load.circle1}`}></div>
        <div className={`${load.circle} ${load.circle2}`}></div>
        <div className={`${load.circle} ${load.circle3}`}></div>
        <div className={`${load.circle} ${load.circle4}`}></div>
      </div>
    </div>
  );
}
export default LoadingScreen;

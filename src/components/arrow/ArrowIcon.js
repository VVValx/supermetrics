import React from "react";
import a from "./Arrow.module.css";

function ArrowIcon({ className, ...props }) {
  return <div className={`${a.arrowIcon} ${className}`} {...props}></div>;
}

export default ArrowIcon;

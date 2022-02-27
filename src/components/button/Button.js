import React from "react";

function Button({ children, className, ...props }) {
  return (
    <div className={className}>
      <button {...props}>{children}</button>
    </div>
  );
}

export default Button;

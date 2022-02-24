import React from "react";

function FormButton({ children, className, ...props }) {
  return (
    <div className={className}>
      <button {...props}>{children}</button>
    </div>
  );
}

export default FormButton;

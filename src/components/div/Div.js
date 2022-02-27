import React from "react";

function Div({ children, ...props }) {
  return <div {...props}>{children}</div>;
}

export default Div;

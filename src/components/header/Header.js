import React from "react";

function Header({ children, className }) {
  return <header className={className}>{children}</header>;
}

export default Header;

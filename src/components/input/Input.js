import React from "react";
import login from "../../pages/login/Login.module.css";

function Input({ type = "text", name, value, onChange, error, label }) {
  return (
    <div className={login.input_container}>
      <div className={login.input_label}>{label}</div>
      <input type={type} name={name} value={value} onChange={onChange} />

      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Input;

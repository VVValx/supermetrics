import React, { useState } from "react";
import Input from "../../components/input/Input";
import ErrorNotification from "../../components/errorNotification/ErrorNotification";
import login from "./Login.module.css";

function Login() {
  const [data, setData] = useState({
    name: "",
    email: "",
  });

  const [error, setError] = useState({
    name: "",
    email: "",
  });

  const [loginError, setLoginError] = useState("");

  // for validating input while user types
  const handleInputError = ({ name, value }) => {
    if (name === "name") if (!value) return `${name} is empty`;

    if (name === "email") {
      const validation = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      const re = new RegExp(validation).test(value);
      if (!value) return `${name} is empty`;
      if (!re) return `${value} is not a valid email`;
    }

    return null;
  };

  //Checks if there's an error while the user types and updates the state if no error
  const handleChange = ({ target: input }) => {
    const newData = { ...data };
    const newError = { ...error };

    const errorMessage = handleInputError(input);

    if (errorMessage) newError[input.name] = errorMessage;
    else delete newError[input.name];

    newData[input.name] = input.value;

    setData(newData);
    setError(newError);
  };

  //Validates input when user clicks go button
  const handleRegisterError = () => {
    const { name, email } = data;
    const validation = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    const re = new RegExp(validation).test(email);

    if (!name || !email) return "Incorrect name or email";
    if (!re) return `Incorrect name or email`;

    return null;
  };

  //Fires this when Go button is clicked
  const handleLogin = () => {
    const error = handleRegisterError();
    if (error) return setLoginError(error);

    callBackend();
  };

  const callBackend = () => {
    console.log("loggin in..");
  };

  return (
    <>
      <ErrorNotification loginError={loginError} />

      <div className={login.container}>
        <header className={`${login.mainHeader} margin-sm`}>Login</header>

        <Input
          name="name"
          value={data.name}
          onChange={handleChange}
          error={error.name}
          label="Name"
        />

        <Input
          name="email"
          value={data.email}
          onChange={handleChange}
          error={error.email}
          label="Email"
        />

        <div className={`${login.input_container} ${login.btn}`}>
          <button onClick={handleLogin}>Go</button>
        </div>
      </div>
    </>
  );
}

export default Login;

import React, { useState, useContext } from "react";
import Input from "../../components/input/Input";
import ErrorNotification from "../../components/errorNotification/ErrorNotification";
import AuthContext from "../../contexts/AuthContext";
import TokenContext from "../../contexts/TokenContext";
import urls from "../../config/urls.json";
import apiCall from "../../services/apiCall";
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
  const { auth, setAuth } = useContext(AuthContext);
  const { tokenObj, setTokenObj } = useContext(TokenContext);

  console.log("token", tokenObj);
  console.log("auth", auth);

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

  const callBackend = async () => {
    try {
      const newData = { client_id: process.env.REACT_APP_CLIENT_ID, ...data };
      const result = await apiCall({ url: urls.register, body: newData });
      const { sl_token } = result.data;
      console.log(result.data);
      setAuth(true);
      setTokenObj({ token: sl_token, lastUpdated: new Date() });
    } catch (error) {
      setLoginError("Database error");
    }
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

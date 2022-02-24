import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useCheckAuth from "../../customHooks/useCheckAuth";
import Input from "../../components/input/Input";
import ErrorNotification from "../../components/errorNotification/ErrorNotification";
import AuthContext from "../../contexts/AuthContext";
import TokenContext from "../../contexts/TokenContext";
import Header from "../../components/header/Header";
import FormButton from "../../formButton/FormButton";
import Container from "../../components/container/Container";
import urls from "../../config/urls.json";
import apiCall from "../../services/apiCall";
import isEmailValid from "../../utils/isEmailValid";
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

  const navigate = useNavigate();

  useCheckAuth(auth);

  console.log("auth", auth);
  console.log("topken", tokenObj);

  // for validating input while user types
  const handleInputError = ({ name, value }) => {
    if (name === "name") if (!value) return `${name} is empty`;

    if (name === "email") {
      const validEmail = isEmailValid(value);
      if (!value) return `${name} is empty`;
      if (!validEmail) return `${value} is not a valid email`;
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
    const validEmail = isEmailValid(email);

    if (!name || !email) return "Incorrect name or email";
    if (!validEmail) return `Incorrect name or email`;

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
      setAuth(true);
      setTokenObj({ token: sl_token, lastUpdated: new Date() });
      navigate("/", { replace: true });
    } catch (error) {
      setLoginError("Database error");
    }
  };

  return (
    <>
      <ErrorNotification loginError={loginError} />

      <Container className={login.container}>
        <Header className={`${login.mainHeader} margin-sm`}>Login</Header>

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

        <FormButton
          className={`${login.input_container} ${login.btn}`}
          onClick={handleLogin}
        >
          Go
        </FormButton>
      </Container>
    </>
  );
}

export default Login;

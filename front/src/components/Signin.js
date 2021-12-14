import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import {
  TextField,
  Button,
  ThemeProvider,
} from "@mui/material";

import API_ROOT from "../lib/const";

const Signin = (props) => {
  axios.defaults.withCredentials = true;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validate = () => {
    if (email === "") {
      const mes = "メールアドレスは空欄ではいけません";
      props.handleFlashMessage(true, "error", mes);
      return false;
    }
    if (password === "") {
      const mes = "パスワードは空欄ではいけません";
      props.handleFlashMessage(true, "error", mes);
      return false;
    }
    return true;
  }

  const signin = async (event) => {
    event.preventDefault();
    try {
      props.setIsLoading(true);
      const valid = validate();
      if (!valid) throw Error;
  
      const data = {
        email: email,
        password: password,
      }
      const res = await axios.post(
        `${API_ROOT}/auth/sign_in`,
        data,
      );
      if (res.status === 200) {
        Cookies.set("access-token", res.headers["access-token"], { secure: true });
        Cookies.set("client", res.headers["client"], { secure: true });
        Cookies.set("uid", res.headers["uid"], { secure: true });
        props.handleCurrentUser();
      }
    } catch (error) {
      console.error(error);
    } finally {
      props.setIsLoading(false);
    }
  }

  if (props.isLoggedIn) {
    return <Redirect to="/" />
  } else {
    return (
      <React.Fragment>
        <h1>サインイン</h1>
        <form className="auth-form">
          <p>メールアドレス</p>
          <ThemeProvider theme={props.theme}>
            <TextField
              required
              type="email"
              value={email}
              className="input-field"
              onChange={event => setEmail(event.target.value)}
            />
            <p>パスワード</p>
            <TextField
              required
              type="password"
              value={password}
              className="input-field"
              onChange={event => setPassword(event.target.value)}
            />
            <Button
              onClick={event => signin(event)}
              className="input-field"
              variant="contained"
              color="button"
            >サインイン</Button>
          </ThemeProvider>
        </form>
      </React.Fragment>
    )
  }
}

export default Signin;

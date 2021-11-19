import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import {
  TextField,
  Button,
  ThemeProvider,
} from "@mui/material";

import { API_ROOT } from "../lib/const";

const Signup = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  const signup = async (event) => {
    event.preventDefault();
    try {
      props.setIsLoading(true);
      const data = {
        name: name,
        email: email,
        password: password,
        password_confirmation: password_confirmation,
      }
      const res = await axios.post(
        `${API_ROOT}/auth`,
        data,
      );
      if (res.status === 200) {
        Cookies.set("access-token", res.headers["access-token"]);
        Cookies.set("client", res.headers["client"]);
        Cookies.set("uid", res.headers["uid"]);
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
        <h1>サインアップ</h1>
        <form className="auth-form">
          <p>名前</p>
          <ThemeProvider theme={props.theme}>
            <TextField
              required
              type="text"
              value={name}
              className="input-field"
              onChange={event => setName(event.target.value)}
            />
            <p>メールアドレス</p>
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
            <p>パスワード(確認)</p>
            <TextField
              required
              type="password"
              value={password_confirmation}
              className="input-field"
              onChange={event => setPasswordConfirmation(event.target.value)}
            />
            <Button
              onClick={event => signup(event)}
              className="input-field"
              variant="contained"
              color="button"
            >サインアップ</Button>
          </ThemeProvider>
        </form>
      </React.Fragment>
    )
  }
}

export default Signup;

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

const Signup = (props) => {
  axios.defaults.withCredentials = true;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  const validate = () => {
    if (name === "") {
      const mes = "名前は空欄ではいけません";
      props.handleFlashMessage(true, "error", mes);
      return false;
    }
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
    if (password !== password_confirmation) {
      const mes = "パスワードが一致していません";
      props.handleFlashMessage(true, "error", mes);
      return false;
    }
    return true;
  }

  const signup = async (event) => {
    event.preventDefault();
    try {
      props.setIsLoading(true);
      const valid = validate();
      if (!valid) throw Error;
    
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

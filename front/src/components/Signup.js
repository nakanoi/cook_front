import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import {
  TextField,
  Button,
  ThemeProvider,
} from "@mui/material";

import { auth } from "../lib/functions";


const Signup = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  const signup = (event) => {
    const data = {
      name: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    }
    const errors = {
      "Name has already been taken": "すでに登録済みのユーザー名です",
      "Email has already been taken": "すでに登録済みのメールアドレスです",
    }
    auth(event, props, data, errors);
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
              onClick={(event) => {
                props.hideFlashMessage();
                signup(event);
              }}
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

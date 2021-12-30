import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import {
  TextField,
  Button,
  ThemeProvider,
} from "@mui/material";

import { auth } from "../lib/functions";


const Signin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signin = (event) => {
    const data = {
      name: false,
      email: email,
      password: password,
      password_confirmation: false,
    }
    const errors = {
      "Name has already been taken": "すでに登録済みのユーザー名です",
      "Email has already been taken": "すでに登録済みのメールアドレスです",
      "Invalid login credentials. Please try again.": "メールアドレスまたはパスワードが違います"
    }
    auth(event, props, data, errors, false); 
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
              onClick={(event) => {
                props.hideFlashMessage();
                signin(event);
              }}
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

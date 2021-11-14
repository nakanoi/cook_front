import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";

import { API_ROOT } from "../lib/const";

const Signin = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signin = async (event) => {
    event.preventDefault();
    try {
      props.setIsLoading(true);
      const data = {
        email: email,
        password: password,
      }
      const res = await axios.post(
        `${API_ROOT}/auth/sign_in`,
        data,
      );
      if (res.status === 200) {
        Cookies.set('access-token', res.headers['access-token']);
        Cookies.set('client', res.headers['client']);
        Cookies.set('uid', res.headers['uid']);
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
        <form>
          <p>メールアドレス</p>
          <input
            required
            type="email"
            value={email}
            label="メールアドレス"
            onChange={event => setEmail(event.target.value)}
          />
          <p>パスワード</p>
          <input
            required
            type="password"
            value={password}
            label="パスワード"
            onChange={event => setPassword(event.target.value)}
          />
          <button
            onClick={event => signin(event)}
          >サインイン</button>
        </form>
      </React.Fragment>
    )
  }
}

export default Signin;

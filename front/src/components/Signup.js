import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";

import { API_ROOT } from "../lib/const";

const Signup = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');

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
        <h1>サインアップ</h1>
        <form>
          <p>名前</p>
          <input
            required
            type="text"
            value={name}
            label="名前"
            onChange={event => setName(event.target.value)}
          />
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
          <p>パスワード(確認)</p>
          <input
            required
            type="password"
            value={password_confirmation}
            label="パスワード(確認)"
            onChange={event => setPasswordConfirmation(event.target.value)}
          />
          <button
            onClick={event => signup(event)}
          >サインアップ</button>
        </form>
      </React.Fragment>
    )
  }
}

export default Signup;

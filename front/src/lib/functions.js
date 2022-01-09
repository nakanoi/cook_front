import Cookies from "js-cookie";
import axios from "axios";

import API_ROOT from "./const";

axios.defaults.withCredentials = true;


export const zip = (...arrays) => {
  const length = Math.min(
    ...(arrays.map(
        arr => arr.length
      )
    )
  );
  return new Array(length).fill().map((_, i) => arrays.map(arr => arr[i]));
}

export const validate = (props, data, signup) => {
  let ret = true,
      errorMes = [];
  if (signup && data.name === "") {
    const mes = "名前は空欄ではいけません";
    errorMes.push(["error", mes]);
    ret = false;
  }
  if (data.email === "") {
    const mes = "メールアドレスは空欄ではいけません";
    errorMes.push(["error", mes]);
    ret = false;
  }
  if (data.password === "") {
    const mes = "パスワードは空欄ではいけません";
    errorMes.push(["error", mes]);
    ret = false;
  }
  if (signup && data.password !== data.password_confirmation) {
    const mes = "パスワードが一致していません";
    errorMes.push(["error", mes]);
    ret = false;
  }
  props.handleFlashMessage(errorMes);
  return ret;
}

export const auth = async (event, props, data, errors, signup=true) => {
  event.preventDefault();
  try {
    props.setIsLoading(true);
    const valid = validate(props, data, signup);
    if (!valid) return;
    let errorMes = [],
        endpoint = "/sign_in";
    if (signup) { endpoint = ""; }

    const res = await axios.post(
      `${API_ROOT}/auth${endpoint}`,
      data,
    );
    if (res.status === 200) {
      if (res.data.status === 200) {
        Cookies.set(
          "access-token",
          res.headers["access-token"],
          { secure: true, expires: 365 }
        );
        Cookies.set(
          "client",
          res.headers["client"],
          { secure: true, expires: 365 }
        );
        Cookies.set(
          "uid",
          res.headers["uid"],
          { secure: true, expires: 365 }
        );
        props.handleFlashMessage([["success", res.data.message]]);
        props.handleCurrentUser();
      } else {
        if (res.data.data.message) {
          errorMes.push(["error", res.data.data.message]);
        } else if (res.data.errors && res.data.errors.full_messages) {
          res.data.errors.full_messages.forEach(error => {
            errorMes.push(["error", errors[error]]);
          });
        } else { throw Error; }
        props.handleFlashMessage(errorMes);
      }
    } else { throw Error;}
  } catch (error) {
    const mes = "エラーが発生しました。時間をおいて再度実行してください";
    props.handleFlashMessage([["error", mes]]);
    console.error(error);
  } finally {
    props.setIsLoading(false);
  }
}

export const createToken = () => {
  const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const N = 40;
  return Array.from(Array(N)).map(
    () => S[Math.floor(Math.random() * S.length)]
  ).join('');
}

export const returnStrDate = (day) => {
  var y = day.getFullYear();
  var m = day.getMonth() + 1;
  var d = day.getDate() + 1;
  var h = day.getHours();
  var min = day.getMinutes();
  var s = day.getSeconds();
  return `${y}-${m}-${d} ${h}:${min}:${s}`;
}


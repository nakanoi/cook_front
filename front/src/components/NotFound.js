import React from "react";
import {
  Link,
} from "react-router-dom";


const NotFound = () => {
  return (
    <React.Fragment>
      <h1>404</h1>
      <h2>お探しのページはございません</h2>
      <Link to="/" >ホームへ戻る</Link>
    </React.Fragment>
  )
}

export default NotFound;

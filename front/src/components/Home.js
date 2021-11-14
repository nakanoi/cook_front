import React from "react";


const Home = (props) => {
  if (Object.keys(props.user)) {
    return (
      <React.Fragment>
        <h1>ホーム</h1>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <h1>ホーム</h1>
        <p>ログインしてください</p>
      </React.Fragment>
    )
  }
}

export default Home;

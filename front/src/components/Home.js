import React from "react";


const Home = (props) => {
  if (Object.keys(props.user)) {
    return (
      <React.Fragment>
        <h1>Home</h1>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <h1>Home</h1>
        <p>Please Login.</p>
      </React.Fragment>
    )
  }
}

export default Home;

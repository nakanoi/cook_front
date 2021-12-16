import React from "react";
import {
  Alert,
} from "@mui/material";


const FlashMessage = (props) => {
  return (
    <React.Fragment>
      <Alert
        severity={props.flashSeverity}
      >{props.flashMes}</Alert>
    </React.Fragment>
  );
}

export default FlashMessage;

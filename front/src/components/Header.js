import React, { useState } from "react";
import {
  Link,
} from "react-router-dom";
import {
  Button,
  List,
  ListItem,
  Modal,
  Box,
} from "@mui/material";
import RestaurantMenuSharpIcon from '@mui/icons-material/RestaurantMenuSharp';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';

import logo from "../images/logo.jpg";


const Header = (props) => {
  const [modalOpen, handleModalOpen] = useState(false);
  const modalStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'absolute',
    top: '0',
    left: '50%',
    transform: 'translate(-50%, 0)',
    width: '100%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  }

  const handleModal = (event) => {
    event.preventDefault();
    handleModalOpen(!modalOpen);
  }

  return (
    <React.Fragment>
      <header className="header">
        <Link to="/" onClick={() => props.hideFlashMessage()}>
          <p className="logo"><img src={logo} alt="logo" /></p>
        </Link>
        <List className="header-nav">
          <ListItem key="home">
            <Link to="/" onClick={() => props.hideFlashMessage()}>ホーム</Link>
          </ListItem>
          {!props.isLoggedIn && (
            <ListItem key="signin">
              <Link to="/signin" onClick={() => props.hideFlashMessage()}>サインイン</Link>
            </ListItem>
          )}
          {!props.isLoggedIn && (
            <ListItem key="signup">
              <Link to="/signup" onClick={() => props.hideFlashMessage()}>サインアップ</Link>
            </ListItem>
          )}
          {props.isLoggedIn && (
            <ListItem key="addfoods">
              <Link to="/addfoods" onClick={() => props.hideFlashMessage()}>食材追加</Link>
            </ListItem>
          )}
          {props.isLoggedIn && (
            <ListItem key="signout" onClick={() => props.hideFlashMessage()}>
              <Button
                onClick={props.signout}
              >サインアウト</Button>
            </ListItem>
          )}
        </List>
        <div className="menu-icon" onClick={handleModal}>
          <RestaurantMenuSharpIcon
            fontSize="large"
          />
          <p>MENU</p>
        </div>
      </header>
      <Modal
        open={modalOpen}
        onClose={handleModal}
      >
        <Box sx={modalStyle}>
          <List>
            <ListItem key="home" onClick={handleModal}>
              <Link to="/" onClick={() => props.hideFlashMessage()}>ホーム</Link>
            </ListItem>
            {!props.isLoggedIn && (
              <ListItem key="signin" onClick={handleModal}>
                <Link to="/signin" onClick={() => props.hideFlashMessage()}>サインイン</Link>
              </ListItem>
            )}
            {!props.isLoggedIn && (
              <ListItem key="signup" onClick={handleModal}>
                <Link to="/signup" onClick={() => props.hideFlashMessage()}>サインアップ</Link>
              </ListItem>
            )}
            {props.isLoggedIn && (
              <ListItem key="addfoods" onClick={handleModal}>
                <Link to="/addfoods" onClick={() => props.hideFlashMessage()}>食材追加</Link>
              </ListItem>
            )}
            {props.isLoggedIn && (
              <ListItem key="signout">
                <Button
                  onClick={props.signout}
                >サインアウト</Button>
              </ListItem>
            )}
          </List>
          <CloseSharpIcon
            onClick={handleModal}
            fontSize="large"
            className="modal-close-button"
          />
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default Header;

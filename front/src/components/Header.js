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
  const [loggedInOpen, handleLoggedInOpen] = useState(false);
  const [notLoggedInOpen, handleNotLoggedInOpen] = useState(false);
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

  const showMenu = (event) => {
    event.preventDefault();
    if (props.isLoggedIn) {
      handleLoggedInOpen(true);
    } else {
      handleNotLoggedInOpen(true);
    }
  }

  const closeModal = (event) => {
    event.preventDefault();
    if (props.isLoggedIn) {
      handleLoggedInOpen(false);
    } else {
      handleNotLoggedInOpen(false);
    }
  }

  if (props.isLoggedIn) {
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
            <ListItem key="addfoods">
              <Link to="/addfoods" onClick={() => props.hideFlashMessage()}>食材追加</Link>
            </ListItem>
            <ListItem key="signout" onClick={() => props.hideFlashMessage()}>
              <Button
                onClick={props.signout}
              >サインアウト</Button>
            </ListItem>
          </List>
          <div className="menu-icon" onClick={showMenu}>
            <RestaurantMenuSharpIcon
              fontSize="large"
            />
            <p>MENU</p>
          </div>
        </header>
        <Modal
          open={loggedInOpen}
          onClose={closeModal}
        >
          <Box sx={modalStyle}>
            <List>
              <ListItem key="home" onClick={closeModal}>
                <Link to="/" onClick={() => props.hideFlashMessage()}>ホーム</Link>
              </ListItem>
              <ListItem key="addfoods" onClick={closeModal}>
                <Link to="/addfoods" onClick={() => props.hideFlashMessage()}>食材追加</Link>
              </ListItem>
              <ListItem key="signout">
                <Button
                  onClick={props.signout}
                >サインアウト</Button>
              </ListItem>
            </List>
            <CloseSharpIcon
              onClick={closeModal}
              fontSize="large"
              className="modal-close-button"
            />
          </Box>
        </Modal>
      </React.Fragment>
    );
  } else {
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
            <ListItem key="signin">
              <Link to="/signin" onClick={() => props.hideFlashMessage()}>サインイン</Link>
            </ListItem>
            <ListItem key="signup">
              <Link to="/signup" onClick={() => props.hideFlashMessage()}>サインアップ</Link>
            </ListItem>
          </List>
          <div className="menu-icon" onClick={showMenu}>
            <RestaurantMenuSharpIcon
              fontSize="large"
            />
            <p>MENU</p>
          </div>
        </header>
        <Modal
          open={notLoggedInOpen}
          onClose={closeModal}
        >
          <Box sx={modalStyle}>
            <List>
              <ListItem key="home" onClick={closeModal}>
                <Link to="/" onClick={() => props.hideFlashMessage()}>ホーム</Link>
              </ListItem>
              <ListItem key="signin" onClick={closeModal}>
                <Link to="/signin" onClick={() => props.hideFlashMessage()}>サインイン</Link>
              </ListItem>
              <ListItem key="signup" onClick={closeModal}>
                <Link to="/signup" onClick={() => props.hideFlashMessage()}>サインアップ</Link>
              </ListItem>
            </List>
            <CloseSharpIcon
              onClick={closeModal}
              fontSize="large"
              className="modal-close-button"
            />
          </Box>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Header;

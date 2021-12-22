import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import {
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import {
  CircularProgress,
  createTheme,
  Backdrop,
} from '@mui/material'

import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Home from "./components/Home";
import AddFoods from "./components/AddFoods";
import NotFound from "./components/NotFound";
import API_ROOT from "./lib/const";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FlashMessage from "./components/FlashMessage";
import { zip } from "./lib/functions";

const App = () => {
  axios.defaults.withCredentials = true;
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [foods, setFoods] = useState([]);
  const [histories, setHistories] = useState([]);
  const [flash, setFlash] = useState(false);
  const [flashSeverity, setFlashSeverity] = useState([]);
  const [flashMes, setFlashMes] = useState([]);

  const theme = createTheme({
    palette: {
      button: {
        main: '#f6581e',
        contrastText: '#fff',
      },
      food_green: {
        main: '#a6cd56',
        contrastText: '#fff',
      },
      delete: {
        main: '#ff3c3c',
        contrastText: '#fff',
      }
    }
  });

  const headers = () => {
    return {
      "access-token": Cookies.get("access-token"),
      "client": Cookies.get("client"),
      "uid": Cookies.get("uid"),
    }
  }

  const signout = () => {
    setIsLoading(true);
    setIsLoggedIn(false);
    Cookies.remove("access-token");
    Cookies.remove("client");
    Cookies.remove("uid");
    setUser({});
    setIsLoading(false);
  }

  const setInitialFoods = (foods) => {
    let newFoods = foods.slice();
    newFoods.map(food => {
      if (food.status) {
        delete food.status;
      }
      if (food.store === 0) {
        food.display = false;
      } else {
        food.display = true;
      }
      return food;
    })
    setFoods(newFoods);
  }

  const handleCurrentUser = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${API_ROOT}/auth/sessions`,
        {headers: headers()}
      );
      if (res.data.is_login) {
        setIsLoggedIn(true);
        setUser(res.data);
        res.data.foods.map(food => {
          delete food.id
          return food
        });
        setInitialFoods(res.data.foods);
        setHistories(res.data.histories);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const addFoods = (food) => {
    let newFoods = foods.slice();
    newFoods.push(food);
    setFoods(newFoods);
  }

  const handleFoodInfo = (event, index, column) => {
    let newFoods = foods.slice(),
        value = event.target.value;
    newFoods[index][column] = value;
    setFoods(newFoods);
  }

  const deleteFood = (event) => {
    const index = event.target.dataset.index;
    let newFoods = foods.slice();
    if (newFoods[index].name === "" ||
          newFoods[index].unit === "") {
      newFoods.splice(index, 1);
    } else {
      newFoods[index].store = 0;
      newFoods[index].display = false;
    }
    setFoods(newFoods);
  }

  const handleFlashMessage = (messages) => {
    let newSeverity = [],
        newMes = [];

    messages.map((mes) => {
      newSeverity.push(mes[0]);
      newMes.push(mes[1]);
      return mes;
    });

    setFlash(true);
    setFlashSeverity(newSeverity);
    setFlashMes(newMes);
  }

  const hideFlashMessage = () => {
    setFlash(false);
    setFlashSeverity([]);
    setFlashMes([]);
  }

  useEffect(() => {
    handleCurrentUser();
  }, []);

  return (
    <React.Fragment>
      <Router>
        <Header
          isLoggedIn={isLoggedIn}
          signout={signout}
          hideFlashMessage={hideFlashMessage}
        />
        <div className="container">
          <Backdrop
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
          >
            <CircularProgress/>
          </Backdrop>
          {flash &&
            zip(flashMes, flashSeverity).map(flashes => {
              return (
                <FlashMessage
                  flashMes={flashes[0]}
                  flashSeverity={flashes[1]}
                />
              )
            })
          }
          <Switch>
            <Route
              path="/signin"
              exact
              render={
                () => <Signin
                  isLoggedIn={isLoggedIn}
                  handleCurrentUser={handleCurrentUser}
                  setIsLoading={setIsLoading}
                  theme={theme}
                  handleFlashMessage={handleFlashMessage}
                  hideFlashMessage={hideFlashMessage}
                />
              }
            ></Route>
            <Route
              path="/signup"
              exact
              render={
                () => <Signup
                  isLoggedIn={isLoggedIn}
                  handleCurrentUser={handleCurrentUser}
                  setIsLoading={setIsLoading}
                  theme={theme}
                  handleFlashMessage={handleFlashMessage}
                  hideFlashMessage={hideFlashMessage}
                />
              }
            ></Route>
            {isLoggedIn && 
              <Route
                path="/addfoods"
                exact
                render={
                  () => <AddFoods
                    user={user}
                    headers={headers}
                    foods={foods}
                    lengt={foods.length}
                    addFoods={addFoods}
                    handleFoodInfo={handleFoodInfo}
                    deleteFood={deleteFood}
                    setFoods={setFoods}
                    setIsLoading={setIsLoading}
                    theme={theme}
                    handleFlashMessage={handleFlashMessage}
                  />
                }
              ></Route>
            }
            <Route
              path="/"
              exact
              render={
                () => <Home
                  user={user}
                  foods={foods}
                  histories={histories}
                  isLoggedIn={isLoggedIn}
                />
              }
            ></Route>
            <Route
              exact
              render={
                () => <NotFound
                  hideFlashMessage={hideFlashMessage}
                />
              }></Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    </React.Fragment>
  );
}

export default App;


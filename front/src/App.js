import React, { useState, useEffect } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import {
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import {
  CircularProgress,
  createTheme,
} from '@mui/material'

import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Home from "./components/Home";
import AddFoods from "./components/AddFoods";
import NotFound from "./components/NotFound";
import { API_ROOT } from "./lib/const";
import Header from "./components/Header";
import Footer from "./components/Footer";


const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [foods, setFoods] = useState([]);
  const [histories, setHistories] = useState([]);

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
      "access-token": Cookie.get("access-token"),
      "client": Cookie.get("client"),
      "uid": Cookie.get("uid"),
    }
  }

  const signout = () => {
    setIsLoading(true);
    setIsLoggedIn(false);
    Cookie.remove("access-token");
    Cookie.remove("client");
    Cookie.remove("uid");
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

  const handleFoodInfo = (event, select=true) => {
    let dataset;
    if (select) {
      dataset = event.explicitOriginalTarget.dataset;
    } else {
      dataset = event.target.parentElement.parentElement.dataset;
    }

    const index = dataset.index,
          column = dataset.column;
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

  useEffect(() => {
    handleCurrentUser();
  }, []);

  if (isLoading) {
    return (
      <React.Fragment>
        <CircularProgress />
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <Router>
          <Header
            isLoggedIn={isLoggedIn}
            signout={signout}
          />
          <div className="container">
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
              <Route component={NotFound}></Route>
            </Switch>
          </div>
          <Footer />
        </Router>
      </React.Fragment>
    );
  };
}

export default App;


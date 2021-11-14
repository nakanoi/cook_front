import React, { useState, useEffect } from "react";
import Cookie from "js-cookie";
import axios from "axios";
import {
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";

import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Home from "./components/Home";
import AddFoods from "./components/AddFoods";
import { API_ROOT } from "./lib/const";


const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [foods, setFoods] = useState([]);

  const headers = () => {
    return {
      "access-token": Cookie.get("access-token"),
      "client": Cookie.get("client"),
      "uid": Cookie.get("uid"),
    }
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
        setUser(res.data.user);
        res.data.foods.map(food => {
          delete food.id
        });
        setFoods(res.data.foods);
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

  const handleFoodInfo = (event, select=true, int=false) => {
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
    if (int) { value = Number(value); }
    newFoods[index][column] = value;
    setFoods(newFoods);
  }

  const deleteFood = (event) => {
    const index = event.target.dataset.index;
    let newFoods = foods.slice();
    newFoods[index]["store"] = 0;
    setFoods(newFoods);
  }

  useEffect(() => {
    handleCurrentUser();
  }, []);

  return (
    <React.Fragment>
      <Router>
        <Switch>
          <Route
            path="/signin"
            exact
            render={
              () => <Signin
                isLoggedIn={isLoggedIn}
                handleCurrentUser={handleCurrentUser}
                setIsLoading={setIsLoading}
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
              />
            }
          ></Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;

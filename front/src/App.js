import React, { useState, useEffect } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';
import {
  Switch,
  Route,
  BrowserRouter as Router,
} from 'react-router-dom';

import Signin from './components/Signin';
import Signup from './components/Signup';
import Home from './components/Home';
import AddFoods from './components/AddFoods';
import { API_ROOT } from './lib/const';


const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [foods, setFoods] = useState([]);

  const headers = () => {
    return {
      'access-token': Cookie.get('access-token'),
      'client': Cookie.get('client'),
      'uid': Cookie.get('uid'),
    }
  }

  const handleCurrentUser = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${API_ROOT}/auth/sessions`,
        {headers: headers()}
      );
      console.log(res.data);
      if (res.data.is_login) {
        setIsLoggedIn(true);
        setUser(res.data.user);
        setFoods(res.data.foods);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
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
                  foods={foods}
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

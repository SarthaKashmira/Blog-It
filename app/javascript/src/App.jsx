import React from "react";

import { isNil, isEmpty, either } from "ramda";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Login, Signup } from "./components/Authentication";
import { PrivateRoute } from "./components/commons";
import DetailedBlog from "./components/DetailedBlog";
import Home from "./components/Home";
import NewBlog from "./components/NewBlog";
import { getFromLocalStorage } from "./utils/storage";

const App = () => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact component={NewBlog} path="/create_new_post" />
        <Route exact component={DetailedBlog} path="/post/:slug" />
        <Route exact component={Signup} path="/signup" />
        <Route exact component={Login} path="/login" />
        <PrivateRoute
          component={Home}
          condition={isLoggedIn}
          path="/"
          redirectRoute="/login"
        />
      </Switch>
    </Router>
  );
};

export default App;

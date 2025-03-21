import React from "react";

import { isNil, isEmpty, either } from "ramda";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Login, Signup } from "./components/Authentication";
import { PrivateRoute } from "./components/commons";
import DetailedBlog from "./components/DetailedBlog";
import EditBlog from "./components/EditBlog";
import Home from "./components/Home";
import MyBlogs from "./components/MyBlogs";
import NewBlog from "./components/NewBlog";
import Sidebar from "./components/Sidebar";
import { getFromLocalStorage } from "./utils/storage";

const App = () => {
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken);

  return (
    <Router>
      <ToastContainer />
      <div className="flex">
        {isLoggedIn && <Sidebar />}
        <div className="w-screen">
          <Switch>
            <Route exact component={NewBlog} path="/create_new_post" />
            <Route exact component={DetailedBlog} path="/post/:slug" />
            <Route exact component={EditBlog} path="/edit_post/:slug" />
            <Route exact component={Signup} path="/signup" />
            <Route exact component={Login} path="/login" />
            <Route exact component={MyBlogs} path="/my_posts" />
            <PrivateRoute
              component={Home}
              condition={isLoggedIn}
              path="/"
              redirectRoute="/login"
            />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;

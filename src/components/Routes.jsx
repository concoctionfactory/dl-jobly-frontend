import React from "react";
import { Route, Switch } from "react-router-dom";
import Companies from "./Companies";
import Company from "./Company";
import Jobs from "./Jobs";
import Profile from "./Profile";
import Login from "./Login";
import Home from "./Home";

function Routes() {
  return (
    <div className="pt-5 col-md-8 offset-md-2">
      <Switch>
        <Route exact path="/">
          <Home></Home>
        </Route>
        <Route exact path="/companies">
          <Companies></Companies>
        </Route>
        <Route exact path="/companies/:handle">
          <Company></Company>
        </Route>
        <Route exact path="/jobs">
          <Jobs></Jobs>
        </Route>
        <Route exact path="/login">
          <Login></Login>
        </Route>
        <Route exact path="/profile">
          <Profile></Profile>
        </Route>
        <Route>cant find</Route>
      </Switch>
    </div>
  );
}

export default Routes;

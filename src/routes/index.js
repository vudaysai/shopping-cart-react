import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Store from '../pages/store';
import About from '../pages/About';
import NotFound from '../pages/NotFound';
import Cart from "../pages/cart";
import Login from '../pages/Auth/Login';

const Routes = () => {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Switch>
        <Route path="/about" component={!token ? Login : About} />
        <Route exact path="/" component={!token ? Login : Store} />
        <Route path="/cart" component={!token ? Login : Cart} />
        <Route path="/register" component={Login} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default Routes;
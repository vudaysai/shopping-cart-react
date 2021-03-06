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
import Register from '../pages/Auth/Register';
import Orders from '../pages/orders';
import Users from '../pages/users';

const Routes = () => {
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin');

  return (
    <Router>
      <Switch>
        <Route path="/about" component={!token ? Login : About} />
        <Route exact path="/" component={!token ? Login : Store} />
        <Route path="/cart" component={!token ? Login : Cart} />
        <Route path="/orders" component={!token ? Login : Orders} />
        {isAdmin === 'true' && <Route path="/users" component={!token ? Login : Users} />}
        <Route path="/register" component={Register} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default Routes;
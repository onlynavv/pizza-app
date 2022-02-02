import React from "react"
import Pizzas from "./Pizzas";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import CustomPizza from "./CustomPizza";
import Orders from "./Orders";
import Error from "./Error";
import Cart from "./Cart"
import Login from "./Login";
import Register from "./Register";
import OrderTracking from "./OrderTracking";
import AdminLogin from "./AdminLogin";
import AdminRegister from "./AdminRegister";
import CheckoutPage from "./CheckoutPage";
import AdminDashboard from "./AdminDashboard";
import AdminInventory from "./AdminInventory";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path='/'>
            <Pizzas />
          </Route>
          <Route path="/custompizza">
            <CustomPizza />
          </Route>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/admin-login">
            <AdminLogin />
          </Route>
          <Route path="/admin-register">
            <AdminRegister />
          </Route>
          <Route path="/admin-dashboard">
            <AdminDashboard />
          </Route>
          <Route path="/admin-inventory">
            <AdminInventory />
          </Route>
          <Route path="/ordertrack">
            <OrderTracking />
          </Route>
          <Route path="/checkout">
            <CheckoutPage />
          </Route>
          <Route path='**'>
            <Error />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

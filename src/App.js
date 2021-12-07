import React from "react"
import Pizzas from "./Pizzas";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import CustomPizza from "./CustomPizza";
import Orders from "./Orders";
import Error from "./Error";
import Cart from "./Cart"

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
          <Route path='**'>
            <Error />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

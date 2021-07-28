import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import MainPage from "./pages/MainPage/MainPage"
import OrderPage from "./pages/OrderPage/OrderPage"

function Wrapper() {
  return (
    <div className="wrapper">
      <Router>
        <Switch>
          <Route path="/order">
            <OrderPage />
          </Route>
          <Route path="/">
            <MainPage />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default Wrapper

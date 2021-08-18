import React from "react"
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom"
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
          <Route path="/main">
            <MainPage />
          </Route>
          <Redirect to="/main" />
        </Switch>
      </Router>
    </div>
  )
}

export default Wrapper

import React, { Component } from "react"
import "./App.css"
import Layout from "./components/Layout/Layout"
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder"
import Checkout from "./containers/Checkout/Checkout"
import { Route, Switch } from "react-router-dom"
import Orders from "./containers/Orders/Orders"

export default class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/checkout' component={Checkout} />
            <Route path='/orders' component={Orders} />
            <Route exact path='/' component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    )
  }
}

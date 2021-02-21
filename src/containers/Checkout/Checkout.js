import React, { Component } from "react"
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary"
import { Route } from "react-router-dom"
import ContactData from "./ContactData/ContactData"
import { connect } from "react-redux"

class Checkout extends Component {
  /*
  componentDidMount() {
    //get url params
    const query = new URLSearchParams(this.props.location.search)
    const ingredients = {}
    let price = null

    //loop throught de key value pair and assign it to ingredients
    for (const [key, value] of query.entries()) {
      if (key !== "price") {
        ingredients[key] = parseInt(value)
      } else {
        price = value
      }
    }

    //Assign the ingredeints to the state
    this.setState({ ingredients: ingredients, totalPrice: price })
  }
*/
  checkoutCancelledHandler = () => {
    this.props.history.goBack()
  }
  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data")
  }
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ings}
          price={this.props.prc}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />

        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
  }
}

export default connect(mapStateToProps)(Checkout)

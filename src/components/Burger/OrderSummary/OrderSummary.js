import React, { Component } from "react"
import Auxiliar from "../../../hoc/Auxiliar"
import Button from "../../UI/Button/Button"

class OrderSummary extends Component {
  //this could be a functional component dosent have to be  class
  componentDidUpdate() {
    console.log("[order summary update]")
  }
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (igKey, index) => (
        <li key={igKey + index}>
          <span style={{ textTransform: "capitalize" }}> {igKey} </span> :
          {this.props.ingredients[igKey]}
        </li>
      )
    )
    return (
      <Auxiliar>
        <h3>Your Order</h3>
        <p>A delicious burguer wuth the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          Total Price: <strong>{this.props.totalPrice.toFixed(2)}</strong>€
        </p>
        <p>Continue to checkOut?</p>

        <Button btnType='Danger' clicked={this.props.purchaseCancelled}>
          CANCEL
        </Button>

        <Button btnType='Success' clicked={this.props.purchaseContinued}>
          CONTINUE
        </Button>
      </Auxiliar>
    )
  }
}

export default OrderSummary

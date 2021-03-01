import React from "react"
import classes from "./Order.module.css"

const Order = (props) => {
  let arrIngredients = []

  for (let [key, value] of Object.entries(props.order.ingredients)) {
    if (value > 0) {
      arrIngredients.push({ [key]: value })
    }
  }
  let final = arrIngredients.map((order) => {
    return (
      <p key={Object.keys(order)}>
        {Object.keys(order)} : ({Object.values(order)})
      </p>
    )
  })

  return (
    <div className={classes.Order}>
      <p>
        Name: <strong>{props.order.orderData.name}</strong>
      </p>
      <p>
        Adress: <strong>{props.order.orderData.street}</strong>
      </p>
      <p>
        Postal Code: <strong>{props.order.orderData.zip}</strong>
      </p>
      <p>
        Delivery Method:{" "}
        <strong>{props.order.orderData.deliveryMethod.toUpperCase()}</strong>
      </p>
      <p>Ingredients: </p>
      {final}
      <p>
        Price: <strong>€ {parseFloat(props.order.price).toFixed(2)}</strong>
      </p>
    </div>
  )
}

export default Order

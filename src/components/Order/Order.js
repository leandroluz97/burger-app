import React from "react"
import classes from "./Order.module.css"

const Order = (props) => {
  let arrIngredients = []
  for (let [key, value] of Object.entries(props.item.ingredients)) {
    if (value > 0) {
      arrIngredients.push({ [key]: value })
    }
  }
  let final = arrIngredients.map((item) => {
    return (
      <p key={Object.keys(item)}>
        {Object.keys(item)} : ({Object.values(item)})
      </p>
    )
  })
  console.log(final)
  return (
    <div className={classes.Order}>
      <p>
        Name: <strong>{props.item.customer.name}</strong>
      </p>
      <p>
        Adress: <strong>{props.item.customer.address.street.street}</strong>
      </p>
      <p>
        Postal Code: <strong>{props.item.customer.address.street.zip}</strong>
      </p>
      <p>
        Delivery Method:{" "}
        <strong>{props.item.deliveryMethod.toUpperCase()}</strong>
      </p>
      <p>Ingredients: </p>
      {final}
      <p>
        Price: <strong>€ {parseFloat(props.item.price).toFixed(2)}</strong>
      </p>
    </div>
  )
}

export default Order

import React from "react"
import classes from "./Burger.module.css"
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient"

const Burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients).map((igKey) => {
    return [...Array(props.ingredients[igKey])].map((_, i) => {
      return <BurgerIngredient key={igKey + i} type={igKey} />
    })
  })
  const validation = transformedIngredients.every((items) => items.length === 0)

  if (validation) {
    transformedIngredients = <p>Please start adding ingredients!</p>
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type='bread-top' />
      {transformedIngredients}
      <BurgerIngredient type='bread-bottom' />
    </div>
  )
}

export default Burger

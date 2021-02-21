import React from "react"
import NavigationItem from "./NavigationItem/NavigationItem"
import classes from "./NavigationItems.module.css"
const NavigationsItems = () => {
  return (
    <ul className={classes.NavigationsItems}>
      <NavigationItem link='/' exact>
        Burguer Builder
      </NavigationItem>
      <NavigationItem link='/orders'>Orders</NavigationItem>
    </ul>
  )
}

export default NavigationsItems

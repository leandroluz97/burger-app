import React from "react"
import NavigationItem from "./NavigationItem/NavigationItem"
import classes from "./NavigationItems.module.css"
const NavigationsItems = (props) => {
  return (
    <ul className={classes.NavigationsItems}>
      <NavigationItem link='/' exact>
        Burguer Builder
      </NavigationItem>
      {props.isAuthenticated && (
        <NavigationItem link='/orders'>Orders</NavigationItem>
      )}
      {props.isAuthenticated ? (
        <NavigationItem link='/logout'>Logout</NavigationItem>
      ) : (
        <NavigationItem link='/auth'>Authenticate</NavigationItem>
      )}
    </ul>
  )
}

export default NavigationsItems

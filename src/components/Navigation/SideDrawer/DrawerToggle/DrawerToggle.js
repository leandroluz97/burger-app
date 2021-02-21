import React from "react"
import classes from "./DrawerToogle.module.css"
const DrawerToggle = (props) => {
  return (
    <div onClick={props.open} className={classes.DrawerToggle}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default DrawerToggle

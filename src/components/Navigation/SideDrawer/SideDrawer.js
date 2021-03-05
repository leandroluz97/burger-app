import React from "react"
import Auxiliar from "../../../hoc/Auxiliar"
import Logo from "../../Burger/Logo/Logo"
import Backdrop from "../../UI/Backdrop/Backdrop"
import NavigationsItems from "../NavigationsItems/NavigationsItems"
import classes from "./SideDrawer.module.css"

const SideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close]
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open]
  }
  return (
    <Auxiliar>
      <Backdrop show={props.open} modalClose={props.closed} />
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo />
        </div>

        <nav>
          <NavigationsItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Auxiliar>
  )
}

export default SideDrawer

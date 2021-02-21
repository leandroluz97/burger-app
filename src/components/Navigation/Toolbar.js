import React from "react"
import Logo from "../Burger/Logo/Logo"
import NavigationsItems from "./NavigationsItems/NavigationsItems"
import DrawerToggle from "./SideDrawer/DrawerToggle/DrawerToggle"
import classes from "./Toolbar.module.css"
const Toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle open={props.open} />
      <div className={classes.Logo}>
        <Logo />
      </div>

      <nav className={classes.DesktopOnly}>
        <NavigationsItems />
      </nav>
    </header>
  )
}

export default Toolbar

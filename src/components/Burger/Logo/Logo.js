import React from "react"
import classes from "./Logo.module.css"
import burguerLogo from "../../../assets/images/burguer_logo_BIG.svg"
const Logo = (props) => {
  return (
    <div className={classes.Logo}>
      <img src={burguerLogo} alt='Burger logo'></img>
    </div>
  )
}

export default Logo

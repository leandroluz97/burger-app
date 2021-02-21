import React, { Component } from "react"
import Auxiliar from "../../hoc/Auxiliar"
import SideDrawer from "../Navigation/SideDrawer/SideDrawer"
import Toolbar from "../Navigation/Toolbar"

import classes from "./Layout.module.css"
class Layout extends Component {
  state = {
    showSideDrawer: false,
  }
  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false })
  }
  sideDrawerOpenHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer }
    })
  }

  render() {
    return (
      <Auxiliar>
        <Toolbar open={this.sideDrawerOpenHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <div>Toolbar, SideDrawer, backdrop</div>
        <main className={classes.Content}>{this.props.children}</main>
      </Auxiliar>
    )
  }
}

export default Layout

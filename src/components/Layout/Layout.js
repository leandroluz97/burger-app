import React, { Component } from "react"
import Auxiliar from "../../hoc/Auxiliar"
import SideDrawer from "../Navigation/SideDrawer/SideDrawer"
import Toolbar from "../Navigation/Toolbar"

import { connect } from "react-redux"

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
        <Toolbar
          isAuth={this.props.isAuthenticated}
          open={this.sideDrawerOpenHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <div>Toolbar, SideDrawer, backdrop</div>
        <main className={classes.Content}>{this.props.children}</main>
      </Auxiliar>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  }
}

export default connect(mapStateToProps)(Layout)

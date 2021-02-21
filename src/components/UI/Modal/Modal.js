import React, { Component } from "react"
import Auxiliar from "../../../hoc/Auxiliar"
import Backdrop from "../Backdrop/Backdrop"
import classes from "./Modal.module.css"

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    )
  }

  componentDidUpdate() {
    console.log("[Modal DidUpdate]")
  }
  render() {
    return (
      <Auxiliar>
        <Backdrop show={this.props.show} modalClose={this.props.modalClose} />
        <div
          className={classes.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </Auxiliar>
    )
  }
}

export default Modal

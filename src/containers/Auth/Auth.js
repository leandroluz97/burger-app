import React, { Component } from "react"
import Button from "../../components/UI/Button/Button"
import Input from "../../components/UI/Input/Input"
import classes from "./Auth.module.css"
import * as actions from "../../store/actions/index"
import { connect } from "react-redux"

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address ",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password ",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
  }
  //validation
  checkValidaty(value, rules) {
    let isValid = true

    if (rules.required) {
      isValid = value.trim() !== "" && isValid
    }
    if (rules.isEmail) {
      const tester = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
      isValid = tester && isValid
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }

    return isValid
  }

  inputChangeHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidaty(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    }
    this.setState({ controls: updatedControls })
  }
  submitHandler = (event) => {
    event.preventDefault()
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value
    )
  }
  render() {
    //create a new array with the from data
    const fromElementArray = []
    for (const key in this.state.controls) {
      fromElementArray.push({ id: key, config: this.state.controls[key] })
    }

    //form
    const form = fromElementArray.map((formElement) => (
      <Input
        key={formElement.id}
        id={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        changed={(event) => this.inputChangeHandler(event, formElement.id)}
        valid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
      />
    ))
    return (
      <div className={classes.Auth}>
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType='Success'>SUBMIT</Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth)
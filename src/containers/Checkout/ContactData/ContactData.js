import React, { Component } from "react"
import Button from "../../../components/UI/Button/Button"
import classes from "./ContactData.module.css"
import axios from "../../../axios-orders"
import Spinner from "../../../components/UI/Spinner/Spinner"
import Input from "../../../components/UI/Input/Input"
import { connect } from "react-redux"

export class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipcode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-mail",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "",
        validation: {},
        valid: true,
      },
    },
    formIsValid: false,
    loading: false,
  }

  //post / sent a new order to de database
  orderHandler = (event) => {
    event.preventDefault()

    this.setState({ loading: true })
    const formData = {}
    for (const key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.prc,
      orderData: formData,
    }

    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false })
        this.props.history.push("/")
      })
      .catch((error) => this.setState({ loading: false }))
  }

  //validation
  checkValidaty(value, rules) {
    let isValid = true

    if (rules.required) {
      isValid = value.trim() !== "" && isValid
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }

    return isValid
  }

  //handle the  input value from on the the those input
  inputChangeHandler = (event, inputIdentifier) => {
    const inputsUpdated = { ...this.state.orderForm[inputIdentifier] }
    const allInputs = { ...this.state.orderForm }

    inputsUpdated.value = event.target.value
    inputsUpdated.valid = this.checkValidaty(
      inputsUpdated.value,
      inputsUpdated.validation
    )
    inputsUpdated.touched = true
    allInputs[inputIdentifier] = inputsUpdated

    //check validaty for al input
    let formIsValid = true
    for (let inputIdentifier in inputsUpdated) {
      formIsValid = inputsUpdated[inputIdentifier].valid && formIsValid
    }

    this.setState({ orderForm: allInputs, formIsValid: formIsValid })
  }
  render() {
    const elementArr = []
    for (const key in this.state.orderForm) {
      elementArr.push({ id: key, config: this.state.orderForm[key] })
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {elementArr.map((item) => {
          return (
            <Input
              key={item.id}
              id={item.id}
              elementType={item.config.elementType}
              elementConfig={item.config.elementConfig}
              value={item.config.value}
              changed={(event) => this.inputChangeHandler(event, item.id)}
              valid={!item.config.valid}
              shouldValidate={item.config.validation}
              touched={item.config.touched}
            ></Input>
          )
        })}

        <Button btnType='Success' disabled={!this.state.formIsValid}>
          Order
        </Button>
      </form>
    )
    if (this.state.loading) {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact Data</h4>
        {form}
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    prc: state.totalPrice,
  }
}
export default connect(mapStateToProps)(ContactData)

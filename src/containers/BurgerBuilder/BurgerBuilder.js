import React, { Component } from "react"
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import Burger from "../../components/Burger/Burger"
import Auxiliar from "../../hoc/Auxiliar"
import Modal from "../../components/UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary"
import axios from "../../axios-orders"
import Spinner from "../../components/UI/Spinner/Spinner"
import withErrorhandler from "../../hoc/withErrorHandler/withErrorhandler"
import { connect } from "react-redux"
import * as actionsTypes from "../../store/actions"

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false,
  }

  componentDidMount() {
    /*
    axios
      .get(`/ingredients.json`)
      .then((response) => {
        this.setState({ ingredients: response.data })
      })
      .catch((error) => {
        this.setState({ error: true })
      })

      */
  }
  //update purschased state
  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((key) => ingredients[key])
      .reduce((acc, val) => acc + val)

    return sum > 0 ? true : false
  }
  /*
  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    const updatedCount = oldCount + 1
    const updateIngredients = {
      ...this.state.ingredients,
    }

    updateIngredients[type] = updatedCount
    const priceAddition = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice + priceAddition

    this.setState({ totalPrice: newPrice, ingredients: updateIngredients })

    this.updatePurchaseState(updateIngredients)
    
    this.setState((prevState) => {
      return {
        ingredients: {
          ...prevState.ingredients,
          [type]: prevState.ingredients[type] + 1,
        },
      }
    })
    
  } */

  /*
  //Remove ingredient from state
  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type]
    if (oldCount <= 0) {
      return
    }
    const updatedCount = oldCount - 1
    const updateIngredients = {
      ...this.state.ingredients,
    }

    updateIngredients[type] = updatedCount
    const priceDeduction = INGREDIENT_PRICES[type]
    const oldPrice = this.state.totalPrice
    const newPrice = oldPrice - priceDeduction

    this.setState({ totalPrice: newPrice, ingredients: updateIngredients })

    this.updatePurchaseState(updateIngredients)
  }
*/
  //Purchasig state
  purschaseHandler = () => {
    this.setState({ purchasing: true })
  }

  //Handle close backdrop
  purschaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  //Purchase Continue
  purschaseContinuelHandler = () => {
    //alert("You Continue!")
    /*
    const queryParams = []
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      )
    }
    queryParams.push("price=" + this.state.totalPrice)
    const queryString = queryParams.join("&")

    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    })
*/
    this.props.history.push("/checkout")
  }

  render() {
    const disabledInfo = {
      ...this.props.ings,
    }
    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null

    let burger = this.state.error ? (
      <p>Ingredients can't be loaded</p>
    ) : (
      <Spinner />
    )
    if (this.props.ings) {
      burger = (
        <Auxiliar>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            totalPrice={this.props.prc.toFixed(2)}
            purchaseable={this.updatePurchaseState(this.props.ings)}
            purschaseHandler={this.purschaseHandler}
            ordered={this.purschaseHandler}
          />
        </Auxiliar>
      )

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseContinued={this.purschaseContinuelHandler}
          purchaseCancelled={this.purschaseCancelHandler}
          totalPrice={this.props.prc}
        />
      )
    }
    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    console.log(this.props.prc)
    return (
      <Auxiliar>
        <Modal
          show={this.state.purchasing}
          modalClose={this.purschaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliar>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    prc: state.totalPrice,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch({ type: actionsTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemoved: (ingName) =>
      dispatch({
        type: actionsTypes.REMOVE_INGREDIENT,
        ingredientName: ingName,
      }),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorhandler(BurgerBuilder, axios))

import * as actionTypes from "./actionTypes"
import axios from "../../axios-orders"

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name,
  }
}

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name,
  }
}

export const setIgredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients,
  }
}

export const fetchIngrdientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  }
}
export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get(`/ingredients.json`)
      .then((response) => {
        dispatch(setIgredients(response.data))
      })
      .catch((error) => {
        dispatch(fetchIngrdientsFailed())
      })
  }
}

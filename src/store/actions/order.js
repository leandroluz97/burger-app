import * as actionTypes from "./actionTypes"
import axios from "../../axios-orders"

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  }
}

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  }
}

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  }
}

export const purchaseBurger = (orderData, token) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart())
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then((response) => {
        dispatch(purchaseBurgerSuccess(response.data.name, orderData))
      })
      .catch((error) => dispatch(purchaseBurgerFail(error)))
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  }
}

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDER_SUCCESS,
    orders: orders,
  }
}

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDER_FAIL,
    error: error,
  }
}

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDER_START,
  }
}

export const fetchOrders = (token) => {
  return (dispatch) => {
    axios
      .get(`/orders.json?auth=${token}`)
      .then((response) => {
        dispatch(fetchOrdersStart())
        const data = response.data

        let arrData = []
        for (let [key, value] of Object.entries(data)) {
          //arrKey.push(key)
          arrData.push({ ...value, id: key })
        }
        dispatch(fetchOrdersSuccess(arrData))
        this.setState({ loading: false, orders: arrData })
      })
      .catch((error) => {
        dispatch(fetchOrdersFail(error))
      })
  }
}

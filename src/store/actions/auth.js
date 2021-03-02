import * as actionTypes from "./actionTypes"
import axios from "axios"

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  }
}

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData,
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  }
}

export const auth = (email, password) => {
  return (dispatch) => {
    dispatch(authStart())
    const API_KEY = "AIzaSyBsZL6WV4q3f8hL6gDmY7EFECwEUNQNXqA"
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    }
    axios
      .post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
        authData
      )
      .then((response) => {
        console.log(response)
        dispatch(authSuccess(response.data))
      })
      .catch((error) => {
        dispatch(authFail(error))
      })
  }
}

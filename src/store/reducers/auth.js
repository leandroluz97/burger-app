import * as actionsTypes from "../actions/actionTypes"

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.AUTH_START:
      return {
        ...state,
        loading: true,
      }

    case actionsTypes.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.idToken,
        error: null,
        userId: action.userId,
      }
    case actionsTypes.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case actionsTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
      }

    default:
      return state
  }
}
export default reducer

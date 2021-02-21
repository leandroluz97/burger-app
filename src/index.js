import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { BrowserRouter as Router } from "react-router-dom"
import { Provider } from "react-redux"
import { createStore } from "redux"
import reducer from "./store/reducer"

//create store with react
const store = createStore(reducer)

const app = (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)
ReactDOM.render(
  <React.StrictMode>{app}</React.StrictMode>,
  document.getElementById("root")
)

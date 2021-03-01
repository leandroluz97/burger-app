import React, { Component } from "react"
import Order from "../../components/Order/Order"
import axios from "../../axios-orders"
import { connect } from "react-redux"
import withErrorHandling from "../../hoc/withErrorHandler/withErrorhandler"

import * as actions from "../../store/actions/index"
import Spinner from "../../components/UI/Spinner/Spinner"
export class Orders extends Component {
  /*
  state = {
    orders: [],
    loading: true,
  }
  */
  componentDidMount() {
    this.props.onFetchOrder()

    /*
    axios
      .get(`/orders.json`)
      .then((response) => {
        const data = response.data

        let arrData = []
        for (let [key, value] of Object.entries(data)) {
          //arrKey.push(key)
          arrData.push({ ...value, id: key })
        }

        this.setState({ loading: false, orders: arrData })
      })
      .catch((error) => {
        console.log(error)
        this.setState({ loading: true })
      })
      */
  }
  render() {
    let orders = !this.props.loading ? (
      this.props.orders.map((order) => {
        return <Order key={order.id} order={order} />
      })
    ) : (
      <Spinner />
    )
    return <div>{orders}</div>
  }
}
const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrder: () => dispatch(actions.fetchOrders()),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandling(Orders, axios))

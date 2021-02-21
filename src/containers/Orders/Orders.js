import React, { Component } from "react"
import Order from "../../components/Order/Order"
import axios from "../../axios-orders"
import withErrorHandling from "../../hoc/withErrorHandler/withErrorhandler"
export class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  }
  componentDidMount() {
    axios
      .get(`/orders.json`)
      .then((response) => {
        this.setState({})

        const data = response.data
        let arrData = []
        for (let [key, value] of Object.entries(data)) {
          //arrKey.push(key)
          arrData.push({ ...value, id: key })
        }
        this.setState({ loading: false, orders: arrData })
      })
      .catch((error) => {
        this.setState({ loading: true })
      })
  }
  render() {
    return (
      <div>
        {this.state.orders.map((item) => {
          return <Order key={item.id} item={item} />
        })}
      </div>
    )
  }
}

export default withErrorHandling(Orders, axios)

import React, { Component } from "react"

import Modal from "../../components/UI/Modal/Modal"
import Auxiliar from "../Auxiliar"
const withErrorhandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
    }

    componentDidMount() {
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null })
        return req
      })
      this.resInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error: error })
        }
      )
    }
    errorConfirmedHandler = () => {
      this.setState({ error: null })
    }
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor)
      axios.interceptors.request.eject(this.resInterceptor)
    }
    render() {
      return (
        <Auxiliar>
          <Modal
            show={this.state.error}
            modelClosed={this.errorConfirmedHandler}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Auxiliar>
      )
    }
  }
}

export default withErrorhandler

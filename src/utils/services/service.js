/* eslint-disable import/first */
/* eslint-disable react/react-in-jsx-scope */
// const axios = require('axios').default
import axios from 'axios'

const defErrorMessage = 'An error occured processing your current request!'

class Services {
  constructor(that) {
    this.that = that
    this.BASE_URL = process.env.REACT_APP_URL_CONFIG
  }
  /**
   * TODO: Set Error Message
   */
  setMessage = (error) => {
    if (error.response?.data.errors) {
      this.that.setState({
        ErrorArray: Object.keys(error.response.data.errors).map(
          (key, value) => error.response.data.errors[key],
        ),
      })
    } else if (error.response?.data.message) {
      console.log('step 2')
      this.that.setState({
        // ErrorArray: Object.keys(error.response.data.message).map(
        //   (key, value) => error.response.data.message[key],
        // ),
        error: error.response.data.message,
      })
    } else {
      console.log('step 3')
      this.that.setState({
        error: error.message,
      })
      console.log(error.message)
    }
  }
  /**
   * TODO: Handle Error Message
   */
  handleError = (error) => {
    if (error.response) {
      console.log('RESPONSE', error)
      this.that.setState({
        isLoading: false,
        modalTitle: '',
        modalText: '',
        modalVisible: false,
        // error: error.response.data?.message,
      })
      this.setMessage(error)
      switch (error.response.status) {
        case 403:
          // swal({
          //   title: 'Session Expired!',
          //   text: 'Login is required for Authentication',
          //   icon: 'info',
          //   buttons: false,
          //   dangerMode: true,
          // }).then((willDelete) => {
          //   if (willDelete) {
          //     this.that.props.history.push('/')
          //   } else {
          //     return
          //   }
          // })
          // this.that.props.history.push('/');
          break
        case 401:
          // swal({
          //   title: 'Session Expired!',
          //   text: 'Login is required for Authentication',
          //   icon: 'info',
          //   buttons: true,
          //   dangerMode: true,
          // }).then((willDelete) => {
          //   if (willDelete) {
          //     this.that.props.history.push('/')
          //   } else {
          //     return
          //   }
          // })
          // this.that.props.history.push('/');
          break
        // case 400:
        //   this.setMessage("error", message);
        //   break;
        // case 500:
        //   this.setMessage("error", message);
        //   break;
        default:
          this.setMessage(error)
          break
      }
    } else if (error.request) {
      console.log('request', error)
      this.that.setState({
        isLoading: false,
        error: error.message,
      })
    } else {
      // Something happened in setting up the request that triggered an Error
      this.that.setState({
        isLoading: false,
        error: defErrorMessage,
      })
      console.log('Error', error)
    }
    setTimeout(
      () =>
        this.that.setState({
          error: '',
          ErrorArray: [],
        }),
      8000,
    )
  }

  /**
   * TODO: LOGIN AUTH
   */
  async AuthLogin(queryData) {
    this.that.setState({
      isLoading: true,
    })
    // const response = await fetch(`${this.BASE_URL}/api/Auth/Login`, {
    //   method: 'POST',
    //   body: JSON.stringify({ username: queryData?.username, password: queryData?.password }),
    // })
    // const jsonData = await response.json()
    // console.log(jsonData)
    // console.log(`${this.BASE_URL}/api/Auth/Login`)
    // console.log(axios)
    try {
      const response = await axios.post(
        `${this.BASE_URL}/api/Auth/Login`,
        {
          username: queryData?.username,
          password: queryData?.password,
        },
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      )
      this.that.setState({
        isLoading: false,
      })
      this.that.props.history.push('/dashboard')
      localStorage.setItem('accessToken', response.data?.accessToken)
      localStorage.setItem('role', response.data?.role)
      localStorage.setItem('fullusername', response.data?.fullusername)
      localStorage.setItem('clientName', response.data?.clientName)
      console.log(response.data)
    } catch (error) {
      this.handleError(error)
    }
  }

  async GetPayslips(queryData) {
    this.that.setState({
      isLoading: true,
    })
    try {
      const response = await axios.get(`${this.BASE_URL}/api/Payslips/GetPayslips`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      this.that.setState({
        isLoading: false,
        paySlips: response?.data,
      })
      console.log(response.data)
    } catch (error) {
      this.handleError(error)
    }
  }
}

export default Services

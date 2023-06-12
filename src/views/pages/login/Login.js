import React from 'react'
import Functions from '../../../utils/function'
import Services from '../../../utils/services/service'
import { Errors } from '../../../utils/components/alerts'
// import {
//   CButton,
//   CCard,
//   CCardBody,
//   CCardGroup,
//   CCol,
//   CContainer,
//   CForm,
//   CFormInput,
//   CInputGroup,
//   CInputGroupText,
//   CRow,
// } from '@coreui/react'
// import CIcon from '@coreui/icons-react'
// import { cilLockLocked, cilUser } from '@coreui/icons'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: '',
      username: '',
      password: '',
      isLoading: false,
    }
    this.functions = new Functions(this)
    this.service = new Services(this)
  }
  handleSubmit = (event) => {
    event.preventDefault()
    const fields = ['username', 'password']

    if (this.functions.checkEmpty(fields)) {
      return
    }

    const data = {
      username: this.state.username.trim(),
      password: this.state.password.trim(),
    }
    console.log(data)
    this.service.AuthLogin(data)
  }
  render() {
    return (
      <div className="container-fluid min-vh-100">
        <div className="row w-100 min-vh-100 align-items-center p-0">
          <div className="col-md d-none d-md-block align-self-stretch m-0 ps-0">
            <div
              className="h-100 w-cover bg-cover"
              // style={{
              //   backgroundImage: 'url(https://landkit.goodthemes.co/assets/img/covers/cover-14.jpg)',
              //   backgroundRepeat: 'no-repeat',
              //   backgroundPosition: 'center',
              // }}
            ></div>
          </div>
          <div className="col-md-7 m-0">
            <div className="card rounded-0">
              <div className="card-body p-5">
                <h1 className="mb-0 fw-bold">Sign in</h1>
                <p className="mb-6 text-muted">Simplify your workflow in minutes.</p>
                {this.state.error && <Errors error={this.state.error} />}
                <form autoComplete="off" onSubmit={this.handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="email">
                      UserName
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-0 auth-input auth-input-lg"
                      id="username"
                      name="username"
                      placeholder="Username"
                      value={this.state.username}
                      onChange={this.functions.handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label" htmlFor="password">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control rounded-0 auth-input auth-input-lg"
                      id="password"
                      name="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.functions.handleChange}
                    />
                  </div>
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn auth-btn rounded-0"
                      disabled={this.state.isLoading}
                    >
                      {this.state.isLoading ? (
                        <div className="d-flex justify-content-center">
                          <div
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></div>
                        </div>
                      ) : (
                        'Login'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login

import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import LoginPage from '../MaterialKitComponents/RegistrationComponents/LoginPage'

class Login extends Component {

  render() {
    const { auth, profile } = this.props
    const loggedIn = auth.uid

    // The following code is for redirecting a SME applicant who just logged in to the appliation
    // The redirect only occurs if they have not completed the application
    if (!auth.isLoaded || !profile.isLoaded) return <div/> 

    if (loggedIn && profile.profile === 'SME') {
      if (!profile.applicationComplete) {
        return <Redirect to='/consultant-application' />
      }
    } 
    else if (loggedIn) {
      return <Redirect to='/' />
    }

      return (
        <LoginPage />
      )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  }
}

export default withRouter(connect(mapStateToProps)(Login))
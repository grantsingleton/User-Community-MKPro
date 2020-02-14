import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import SignUpSMEPage from '../MaterialKitComponents/RegistrationComponents/SignUpSMEPage'

class SignupAsSME extends Component {

  render() {
    const { auth } = this.props
    const loggedIn = auth.uid
  
    if (loggedIn) return <Redirect to='/consultant-application' />
  
    if (!auth.isLoaded) return <div/> 

    return (
      <SignUpSMEPage />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

export default withRouter(connect(mapStateToProps)(SignupAsSME))
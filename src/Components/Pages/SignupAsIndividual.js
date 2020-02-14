import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import SignUpIndividualPage from '../MaterialKitComponents/RegistrationComponents/SignupIndividualPage'

class SignupAsIndividual extends Component {

  render() {
    const { auth } = this.props
    const loggedIn = auth.uid
  
    if (loggedIn) return <Redirect to='/' />
  
    if (!auth.isLoaded) return <div/> 

    return (
      <SignUpIndividualPage />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

export default withRouter(connect(mapStateToProps)(SignupAsIndividual))
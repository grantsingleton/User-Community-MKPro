import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import SignUpBusinessPage from '../MaterialKitComponents/RegistrationComponents/SignUpBusinessPage'

class SignupAsBusiness extends Component {

  render() {
    const { auth } = this.props
    const loggedIn = auth.uid
  
    if (loggedIn) return <Redirect to='/' />
  
    if (!auth.isLoaded) return <div/> 

    return (
      <SignUpBusinessPage />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  }
}

export default withRouter(connect(mapStateToProps)(SignupAsBusiness))
import React, { Component } from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import SMEApplication from '../Components/UserComponents/SMEApplication'

class Application extends Component {

  render() {
    const { auth, profile } = this.props

    if (!auth.isLoaded || !profile.isLoaded) return <div/> 
    if (!auth.uid) return <Redirect to='/' />

    return (
      <SMEApplication
        profileProps={profile}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  }
}

export default withRouter(connect(mapStateToProps)(Application))
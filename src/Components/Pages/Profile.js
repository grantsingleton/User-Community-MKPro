import React, { Component } from 'react'
import Container from '@material-ui/core/Container'

class Profile extends Component {

  render() {
    return (
      <Container maxWidth='lg'>
        <h1>Profile Page</h1>
        <p>Take the user Id off the props in the url and query which type of profile this user is.</p>
        <p>Then render the correct profile page. Individual, Individual as part of company license, or Consultant.</p>
        <p>Finally, check the auth.id stored in Redux state and if the viewer owns the profile, then offer them the editing ability.</p>
      </Container>
    )
  }
}
export default Profile
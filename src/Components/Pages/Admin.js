import React, { Component, Fragment } from 'react'
import AdminSheet from '../Components/ForumComponents/AdminSheet'
import {withRouter} from 'react-router-dom'

class Admin extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
    }
  }

  render() {

    return (
      <Fragment>
        <AdminSheet />
      </Fragment>
    )
  }
}
export default withRouter(Admin)
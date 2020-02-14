import React, {Component, Fragment} from 'react'
import { CommentsTable } from '../Components'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container'

class ForumDiscussion extends Component {

  render() {

    const { auth } = this.props
    const loggedOut = !auth.uid

    const root = {
      textAlign: 'center',
      marginTop: '50px',
    }
    const loader = {
      display: 'inlineBlock'
    }

    if(!auth.isLoaded) return <div style={root}><CircularProgress style={loader} /> </div>

    if (loggedOut) return <Redirect to='/login' />

    // Need to move NewComment Bar functionality into the Comments table
    return (
      <Container maxWidth='lg'>
        <Fragment>
          <CommentsTable 
            forum_doc_id={this.props.match.params.forum_id} 
            genre_doc_id={this.props.match.params.genre_id} 
            topic_doc_id={this.props.match.params.topic_id}
          />
        </Fragment>
      </Container>
    )
  }
}
export default connect((state, props) => ({
    auth: state.firebase.auth
  }))(ForumDiscussion)
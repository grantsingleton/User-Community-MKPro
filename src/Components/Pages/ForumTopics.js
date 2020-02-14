import React, {Component, Fragment} from 'react';
import { TopicsTable } from '../Components'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {Redirect} from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container'
 
class ForumTopics extends Component {
  render() {

    const forum_doc_id = this.props.match.params.forum_id
    const genre_doc_id = this.props.match.params.genre_id
    const { auth } = this.props
    const loggedOut = !auth.uid

    const root = {
      textAlign: 'center',
      marginTop: '50px',
    }
    const loader = {
      display: 'inlineBlock'
    }

    if (!auth.isLoaded) return <div style={root}><CircularProgress style={loader} /> </div>

    if (loggedOut) return <Redirect to='/login' />

    return(
      <Container maxWidth='lg'>
        <Fragment>
          <TopicsTable 
            forum_doc_id={forum_doc_id}
            genre_doc_id={genre_doc_id}
          />
        </Fragment>
      </Container>
    )
  }
}

export default compose(
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
 )(ForumTopics)
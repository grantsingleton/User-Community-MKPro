import React, { Component, Fragment } from 'react'
import { ForumSection } from '../Components'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import {withRouter} from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container'

class Forum extends Component {

  render() {

    const { forum } = this.props

    const root = {
      textAlign: 'center',
      marginTop: '50px',
    }
    const loader = {
      display: 'inlineBlock'
    }

    if (!forum) {
      console.log(forum)
      return <div style={root}><CircularProgress style={loader} /> </div>
    } 

    // sort forum sections by index
    forum.sort((a, b) => (a.index > b.index) ? 1 : -1)
    return (
      <Container maxWidth='lg'>
        <Fragment>
          {forum.map(forumSection => {
            console.log("SECTION", forumSection)
            return (
              <ForumSection 
                title={forumSection.title} 
                doc_id={forumSection.id} 
                key={forumSection.id}
              />
            )
          })}
        </Fragment> 
      </Container>
    ) 
  }
}

export default withRouter(compose(
  firestoreConnect(() => ['forum']),  //connects to the collection 'forums'
  connect((state) => ({
    forum: state.firestore.ordered.forum
  }))
)(Forum))

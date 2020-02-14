import React, { Fragment } from 'react'
import ForumTable from './ForumTable'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'

function ForumSection(props) {

    const { genres } = props

    if (!genres) {
      console.log("nullGenres", genres)
      return <div />
    }
    else {
      return (
        <ForumTable 
          forum_doc_id={props.doc_id}
          title={props.title}
        />
      )
    }
}
export default compose(
  firestoreConnect((props) => [
    { collection: 'forum', 
      doc: props.doc_id, 
      subcollections: [{collection: 'genre'}],
      storeAs: `${props.doc_id}-genre`
    }
  ]),
  connect((state, props) => ({
    genres: state.firestore.ordered[`${props.doc_id}-genre`]
  }))
)(ForumSection)

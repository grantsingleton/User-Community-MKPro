import React, { Fragment } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'

function Author({author, bold}) {
  console.log("author", author)
  if (!author) {
    return <div/>
  }

  if (bold) {
    return(
      <Fragment>
        <b>{author.username}</b>
      </Fragment>
    )
  } else {
    return(
      <Fragment>
        {author.username}
      </Fragment>
    )
  }
}

export default compose(
  firestoreConnect((props) => [
    { collection: 'users', doc: props.authorId } // or `todos/${props.todoId}`
  ]),
  connect(({ firestore: { data } }, props) => ({
    author: data.users && data.users[props.authorId]
  }))
 )(Author) 
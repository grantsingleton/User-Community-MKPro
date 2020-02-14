// action creator
export const createTopic = (topic) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

    const firestore = getFirestore()
    const authId = getState().firebase.auth.uid

    var docRef = 
      firestore.collection('forum')
                .doc(topic.forum_doc_id)
                .collection('genre')
                .doc(topic.genre_doc_id)
                .collection('topic').add({
                    title: topic.topic,
                    lastComment: new Date(),
                    lastAuthor: topic.author,
                    views: [],
                    totalComments: 1
    }).then((docRef) => {
      firestore.collection('forum')
                .doc(topic.forum_doc_id)
                .collection('genre')
                .doc(topic.genre_doc_id)
                .collection('topic')
                .doc(docRef.id)
                .collection('comment').add({
                  authorId: authId,
                  comment: topic.comment,
                  upVotes: [],
                  edits: 0,
                  createdAt: new Date()
                })
      .then(() => {
        dispatch({type: 'CREATE_TOPIC', topic: topic})
      }).catch((error) => {
        dispatch({type: 'CREATE_TOPIC_ERROR', error})
      })
    }).catch((error) => {
      dispatch({type: 'CREATE_TOPIC_ERROR', error})
    })
  }
}

export const deleteTopic = (topic) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

    const firestore = getFirestore()
    console.log("TOPIC", topic)
    firestore.collection('forum')
              .doc(topic.forum_doc_id)
              .collection('genre')
              .doc(topic.genre_doc_id)
              .collection('topic')
              .doc(topic.topic_doc_id)
              .delete()
    .then(() => {
      dispatch({type: 'DELETE_TOPIC', topic: topic})
    }).catch((error) => {
      dispatch({type: 'DELETE_TOPIC_ERROR', error})
    })
  }
}

export const addView = (view) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {  

    const firestore = getFirestore()
    const firebase = getFirebase()

    var docRef = firestore.collection('forum')
                          .doc(view.forum_doc_id)
                          .collection('genre')
                          .doc(view.genre_doc_id)
                          .collection('topic')
                          .doc(view.topic_doc_id)
    
    docRef.get().then(function(doc) {
      if (doc.exists) {
        if (!doc.data().views.includes(view.userId)) {
          firestore.collection('forum')
                  .doc(view.forum_doc_id)
                  .collection('genre')
                  .doc(view.genre_doc_id)
                  .collection('topic')
                  .doc(view.topic_doc_id)
                  .update({
                    'views': firebase.firestore.FieldValue.arrayUnion(view.userId)
                  })
          .then(() => {
            dispatch({type: 'UPDATE_VIEWS', view: view})
          }).catch((error) => {
            dispatch({type: 'UPDATE_VIEWS_ERROR', error})
          })
        }
      }
    }).catch((error) => {
      dispatch({type: 'UPDATE_VIEWS_ERROR', error})
    })
  }
}

export const makePrivate = (topic) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

    const firestore = getFirestore()
    firestore.collection('forum')
              .doc(topic.forum_doc_id)
              .collection('genre')
              .doc(topic.genre_doc_id)
              .collection('topic')
              .doc(topic.topic_doc_id)
              .update({
                'isPrivate': true,
              })
    .then(() => {
      dispatch({type: 'MAKE_TOPIC_PRIVATE', topic: topic})
    }).catch((error) => {
      dispatch({type: 'MAKE_TOPIC_PRIVATE_ERROR', error})
    })
  }
}


export const moveTopic = (topic) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

    // this function needs to deep copy the topic data to the destination Forum
    // Finally, delete the old topic

    // first, create a new topic in the 'move to' forum
    const firestore = getFirestore()
    console.log('TOPIC', topic)
    var topicRef = firestore.collection('forum')
                            .doc(topic.moveToForumDocId)
                            .collection('genre')
                            .doc(topic.moveToGenreDocId)
                            .collection('topic')
                            .add({
                              'title': topic.title,
                              'lastComment': topic.topic.lastComment,
                              'lastAuthor': topic.topic.lastAuthor,
                              'views': topic.topic.views,
                              'totalComments': topic.topic.totalComments
                            })
    .then((topicRef) => {
      // Next, fetch the comments from the topic that we want to move
      console.log('topicref', topicRef._key.path.segments[5])
      const newLocationId = topicRef._key.path.segments[5]
      firestore.collection('forum')
                .doc(topic.forum_doc_id)
                .collection('genre')
                .doc(topic.genre_doc_id)
                .collection('topic')
                .doc(topic.topic_doc_id)
                .collection('comment')
                .get()
                .then(function(commentsCollection) {
                  commentsCollection.forEach(function(commentDoc) {
                    // write each comment doc into the new topic location
                    console.log('comment doc', commentDoc.data())
                    firestore.collection('forum')
                            .doc(topic.moveToForumDocId)
                            .collection('genre')
                            .doc(topic.moveToGenreDocId)
                            .collection('topic')
                            .doc(newLocationId)
                            .collection('comment')
                            .add({
                              authorId: commentDoc.data().authorId,
                              comment: commentDoc.data().comment,
                              upVotes: commentDoc.data().upVotes,
                              edits: commentDoc.data().edits,
                              createdAt: commentDoc.data().createdAt
                            }).then(() => {
                              console.log('Added comment successfully')
                            }).catch((error) => {
                              console.log('failed to add comment', error)
                              dispatch({type: 'MOVE_TOPIC_ERROR', error})
                            })
                  })
                }).then(() => {
                  firestore.collection('forum')
                            .doc(topic.forum_doc_id)
                            .collection('genre')
                            .doc(topic.genre_doc_id)
                            .collection('topic')
                            .doc(topic.topic_doc_id)
                            .delete()
                            .then(() => {
                              console.log('Former topic location deleted')
                              dispatch({type: 'MOVE_TOPIC', topic: topic})
                            }).catch((error) => {
                              console.log('failed to delete former location', error)
                              dispatch({type: 'MOVE_TOPIC_ERROR', error})
                            })
                }).catch((error) => {
                  console.log('failed to retrieve comment collection', error)
                  dispatch({type: 'MOVE_TOPIC_ERROR', error})
                })
    }).catch((error) => {
      console.log('failed to add new topic doc to new location', error)
      dispatch({type: 'MOVE_TOPIC_ERROR', error})
    })

  }
}

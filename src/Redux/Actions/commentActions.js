// action creator
export const createComment = (comment) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

    const firestore = getFirestore()
    const firebase = getFirebase()
    const authId = getState().firebase.auth.uid
    const profile = getState().firebase.profile

    firestore.collection('forum')
             .doc(comment.forum_doc_id)
             .collection('genre')
             .doc(comment.genre_doc_id)
             .collection('topic')
             .doc(comment.topic_doc_id)
             .collection('comment')
             .add({
                authorId: authId,
                comment: comment.comment,
                upVotes: [],
                edits: 0,
                createdAt: new Date()
              })
.then(() => {
  firestore.collection('forum')
           .doc(comment.forum_doc_id)
           .collection('genre')
           .doc(comment.genre_doc_id)
           .collection('topic')
           .doc(comment.topic_doc_id)
           .update({
             'lastAuthor': profile.username,
             'lastComment': new Date(),
             'totalComments': firebase.firestore.FieldValue.increment(1)
}).then(() => {
  firestore.collection('forum')
           .doc(comment.forum_doc_id)
           .collection('genre')
           .doc(comment.genre_doc_id)
           .update({
             'lastPost': new Date()
           }).then(() => {
            dispatch({type: 'CREATE_COMMENT', comment: comment})
           }).catch((error) => {
            dispatch({type: 'CREATE_COMMENT_ERROR', error})
           })
            }).catch((error) => {
              dispatch({type: 'CREATE_COMMENT_ERROR', error})
            })
          }).catch((error) => {
            dispatch({type: 'CREATE_COMMENT_ERROR', error})
          })
  }
}

// This creates a reply to a comment
export const createReply = (comment) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

    const firestore = getFirestore()
    const firebase = getFirebase()
    const authId = getState().firebase.auth.uid
    const profile = getState().firebase.profile

    var commentDocRef = firestore.collection('forum')
             .doc(comment.forum_doc_id)
             .collection('genre')
             .doc(comment.genre_doc_id)
             .collection('topic')
             .doc(comment.topic_doc_id)
             .collection('comment')
             .add({
                authorId: authId,
                comment: comment.comment,
                upVotes: [],
                edits: 0,
                createdAt: new Date(),
                isQuoted: comment.isQuoted,
                repliedToId: comment.repliedToId,
                repliedToAuthorId: comment.repliedToAuthorId,
              })
.then(() => {
  firestore.collection('forum')
           .doc(comment.forum_doc_id)
           .collection('genre')
           .doc(comment.genre_doc_id)
           .collection('topic')
           .doc(comment.topic_doc_id)
           .update({
             'lastAuthor': profile.username,
             'lastComment': new Date(),
             'totalComments': firebase.firestore.FieldValue.increment(1)
}).then(() => {
// Send notification to the one who was replied to 
  firestore.collection('users')
           .doc(comment.repliedToAuthorId)
           .collection('notification')
           .add({
            type: 'reply',
            text: comment.comment,
            author: authId,
            unread: true,
            createdAt: new Date(),
            forumDocId: comment.forum_doc_id,
            genreDocId: comment.genre_doc_id,
            topicDocId: comment.topic_doc_id,
           }).then(() => {
              dispatch({type: 'CREATE_REPLY', comment: comment})
            }).catch((error) => {
              dispatch({type: 'CREATE_REPLY_ERROR', error})
            })
          }).catch((error) => {
            dispatch({type: 'CREATE_REPLY_ERROR', error})
          })
        }).catch((error) => {
          dispatch({type: 'CREATE_REPLY_ERROR', error})
        })
  }
}

export const deleteComment = (comment) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

    const firestore = getFirestore()
    firestore.collection('forum')
              .doc(comment.forum_doc_id)
              .collection('genre')
              .doc(comment.genre_doc_id)
              .collection('topic')
              .doc(comment.topic_doc_id)
              .collection('comment')
              .doc(comment.comment_doc_id)
              .delete()
.then(() => {
      dispatch({type: 'DELETE_COMMENT', comment: comment})
    }).catch((error) => {
      dispatch({type: 'DELETE_COMMENT_ERROR', error})
    })
  }
}

export const addUpVote = (vote) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {  

    const firestore = getFirestore()
    const firebase = getFirebase()

    var docRef = firestore.collection('forum')
                          .doc(vote.forum_doc_id)
                          .collection('genre')
                          .doc(vote.genre_doc_id)
                          .collection('topic')
                          .doc(vote.topic_doc_id)
                          .collection('comment')
                          .doc(vote.comment_doc_id)
    
    docRef.get().then(function(doc) {
      if (doc.exists) {
        if (!doc.data().upVotes.includes(vote.userId)) {
          firestore.collection('forum')
                  .doc(vote.forum_doc_id)
                  .collection('genre')
                  .doc(vote.genre_doc_id)
                  .collection('topic')
                  .doc(vote.topic_doc_id)
                  .collection('comment')
                  .doc(vote.comment_doc_id)
                  .update({
                    'upVotes': firebase.firestore.FieldValue.arrayUnion(vote.userId)
                  })
          .then(() => {
            dispatch({type: 'ADD_UPVOTE', vote: vote})
          }).catch((error) => {
            dispatch({type: 'ADD_UPVOTE_ERROR', error})
          })
        }
      }
    }).catch((error) => {
      dispatch({type: 'ADD_UPVOTE_ERROR', error})
    })
  }
}

export const editComment = (comment) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

    const firestore = getFirestore()
    const firebase = getFirebase()

    firestore.collection('forum')
             .doc(comment.forum_doc_id)
             .collection('genre')
             .doc(comment.genre_doc_id)
             .collection('topic')
             .doc(comment.topic_doc_id)
             .collection('comment')
             .doc(comment.comment_doc_id)
             .update({
                'comment': comment.comment,
                'edits': firebase.firestore.FieldValue.increment(1),
    }).then(() => {
      dispatch({type: 'EDIT_COMMENT', comment})
    }).catch((error) => {
      dispatch({type: 'EDIT_COMMENT_ERROR', error})
    })
  }
}

export const addFlag = (flag) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

    const firestore = getFirestore()

    firestore.collection('flag').add({
      forum_doc_id: flag.forum_doc_id,
      genre_doc_id: flag.genre_doc_id,
      topic_doc_id: flag.topic_doc_id,
      comment_doc_id: flag.comment_doc_id,
      type: flag.type
    })
.then(() => {
      dispatch({type: 'FLAG_COMMENT', flag: flag})
    }).catch((error) => {
      dispatch({type: 'FLAG_COMMENT_ERROR', error})
    })
  }
}

export const markRead = (notificationid) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

    const firestore = getFirestore()
    const authId = getState().firebase.auth.uid
    firestore.collection('users')
              .doc(authId)
              .collection('notification')
              .doc(notificationid)
              .update({
                'unread': false
              })
.then(() => {
      dispatch({type: 'MARK_NOTIFICATION_READ', notificationId: notificationid})
    }).catch((error) => {
      dispatch({type: 'MARK_NOTIFICATION_READ_ERROR', error})
    })
  }
}
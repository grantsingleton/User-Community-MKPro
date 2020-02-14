// action for creating a forum topic
export const createGenre = (genre) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore()
    console.log("GENRE", genre)

    firestore.collection('forum')
             .doc(genre.forum_doc_id)
             .collection('genre').add({
                title: genre.title,
                subtitle: genre.subtitle
    }).then(() => {
      dispatch({type: 'CREATE_GENRE', genre: genre})
    }).catch((error) => {
      dispatch({type: 'CREATE_GENRE_ERROR', error})
    })
  }
}

export const createSection = (section) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore()
    console.log("SECTION", section)

    firestore.collection('forum')
             .add({
                title: section.title,
    }).then(() => {
      dispatch({type: 'CREATE_SECTION', section: section})
    }).catch((error) => {
      dispatch({type: 'CREATE_SECTION_ERROR', error})
    })
  }
}

export const updateSectionIndex = (section) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore()
    console.log("SECTION", section)

    firestore.collection('forum')
             .doc(section.doc_id)
             .update({
               index: section.index,
             })
    .then(() => {
      dispatch({type: 'UPDATE_SECTION_INDEX', section: section})
    }).catch((error) => {
      dispatch({type: 'UPDATE_SECTION_INDEX_ERROR', error})
    })
  }
}

export const updateForumIndex = (genre) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // make async call to database
    const firestore = getFirestore()
    console.log("GENRE", genre)

    firestore.collection('forum')
             .doc(genre.forum_doc_id)
             .collection('genre')
             .doc(genre.genre_doc_id)
             .update({
               index: genre.index,
             })
    .then(() => {
      dispatch({type: 'UPDATE_FORUM_INDEX', genre: genre})
    }).catch((error) => {
      dispatch({type: 'UPDATE_FORUM_INDEX_ERROR', error})
    })
  }
}

export const deleteForum = (genre) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

    const firestore = getFirestore()
    console.log("FORUM", genre)
    firestore.collection('forum')
              .doc(genre.forum_doc_id)
              .collection('genre')
              .doc(genre.genre_doc_id)
              .delete()
    .then(() => {
      dispatch({type: 'DELETE_FORUM', genre: genre})
    }).catch((error) => {
      dispatch({type: 'DELETE_FORUM_ERROR', error})
    })
  }
}

export const deleteSection = (section) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

    const firestore = getFirestore()
    console.log("FORUM Section", section)
    firestore.collection('forum')
              .doc(section.forum_doc_id)
              .delete()
    .then(() => {
      dispatch({type: 'DELETE_SECTION', section: section})
    }).catch((error) => {
      dispatch({type: 'DELETE_SECTION_ERROR', error})
    })
  }
}
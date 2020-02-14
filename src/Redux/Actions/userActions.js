export const updateBOS = (user) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

    const firestore = getFirestore()
    const authId = getState().firebase.auth.uid
    console.log(authId)
    firestore.collection('users')
             .doc(authId)
             .update({
                'branchOfService': user.branch,
                'dateOfSeparation': user.separationDate,
    }).then(() => {
      dispatch({type: 'UPDATE_BOS', user})
    }).catch((error) => {
      dispatch({type: 'UPDATE_BOS_ERROR', error})
    })
  }
}

export const updateJobRank = (user) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {

    const firestore = getFirestore()
    const authId = getState().firebase.auth.uid
    console.log(authId)
    firestore.collection('users')
             .doc(authId)
             .update({
                'job': user.job,
                'rank': user.rank,
    }).then(() => {
      dispatch({type: 'UPDATE_JOB_RANK', user})
    }).catch((error) => {
      dispatch({type: 'UPDATE_JOB_RANK_ERROR', error})
    })
  }
}
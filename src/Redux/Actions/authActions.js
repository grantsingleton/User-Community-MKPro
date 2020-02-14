export const signIn = (credentials) => {
  console.log(credentials)
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then(() => {
      dispatch({type: 'LOGIN_SUCCESS'})
    }).catch((error) => {
      dispatch({type: 'LOGIN_ERROR', error})
    })
  }
}

export const signOut = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase()

    firebase.auth().signOut().then(() => {
      dispatch({type: 'SIGNOUT_SUCCESS'})
    })
  }
}

export const signUp = (newUser) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase()
    const firestore = getFirestore() // this is for storing data about the user in firestore

    firebase.auth().createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    ).then((response) => {
      return firestore.collection('users').doc(response.user.uid).set({
        username: newUser.username,
        email: newUser.email,
        profile: 'individual',
      })
    }).then(() => {
      dispatch({type: 'SIGNUP_SUCCESS'})
    }).catch((error) => {
      dispatch({type: 'SIGNUP_ERROR', error})
    })
  }
}

export const signUpSME = (newSME) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase()
    const firestore = getFirestore() // this is for storing data about the user in firestore

    firebase.auth().createUserWithEmailAndPassword(
      newSME.email,
      newSME.password
    ).then((response) => {
      return firestore.collection('users').doc(response.user.uid).set({
        username: newSME.firstName + " " + newSME.lastName,
        firstName: newSME.firstName,
        lastName: newSME.lastName,
        email: newSME.email,
        approved: false,
        applicationComplete: false,
        profile: 'SME',
      })
    }).then(() => {
      dispatch({type: 'SIGNUP_SME_SUCCESS'})
    }).catch((error) => {
      dispatch({type: 'SIGNUP_SME_ERROR', error})
    })
  }
}
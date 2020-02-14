import forumsReducer from './forumsReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import authReducer from './authReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
  forum: forumsReducer,
  firestore: firestoreReducer,
  auth: authReducer,
  firebase: firebaseReducer,
  user: userReducer,
})
export default rootReducer

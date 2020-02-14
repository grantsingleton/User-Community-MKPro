import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './Redux/Reducers/rootReducer'
import App from "./Components/App";
import firebaseConfig from './Config/firebaseConfig'
import { createFirestoreInstance, reduxFirestore, getFirestore } from 'redux-firestore'
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase'
import firebase from 'firebase/app'
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from "@material-ui/core/styles";

const store = createStore(rootReducer, 
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
    reduxFirestore(firebase, firebaseConfig),
  )
);

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
}

const reactReduxFBProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}

const rootElement = document.getElementById("root");
ReactDOM.render(
<Provider store={store}>
  <ReactReduxFirebaseProvider {...reactReduxFBProps}>
    <CssBaseline />
    <App /> 
   </ReactReduxFirebaseProvider>
</Provider>, 
rootElement
);

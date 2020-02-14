  import firebase from 'firebase/app'
  import 'firebase/firestore'
  import 'firebase/auth'
  
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyC4YbshYGPsTNhBF8oURv7xIPfnLSAdAPc",
    authDomain: "user-communtity.firebaseapp.com",
    databaseURL: "https://user-communtity.firebaseio.com",
    projectId: "user-communtity",
    storageBucket: "user-communtity.appspot.com",
    messagingSenderId: "303622255114",
    appId: "1:303622255114:web:58467333fe1561b42265f3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({ timestampsInSnapshots: true})

  export default firebase
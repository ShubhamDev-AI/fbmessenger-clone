import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"
const config = {
  apiKey: "AIzaSyCVI6TyvqJLD9zns7t14iK3zUSE48tFFRw",
  authDomain: "fbmessengerclone-aaa62.firebaseapp.com",
  databaseURL: "https://fbmessengerclone-aaa62.firebaseio.com",
  // projectId: "app-name",
  // storageBucket: "app-name.appspot.com",
  // messagingSenderId: "xxxxxxxxxxxx",
}
firebase.initializeApp(config)

export const auth = firebase.auth
export const db = firebase.database() //firebase.firestore()

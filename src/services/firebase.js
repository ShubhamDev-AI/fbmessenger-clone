import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"
const config = {
  apiKey: "xxxxxxxxxxxx",
  authDomain: "xxxxxxxxxxxx",
  databaseURL: "xxxxxxxxxxxx",
  // projectId: "app-name",
  // storageBucket: "app-name.appspot.com",
  // messagingSenderId: "xxxxxxxxxxxx",
}
firebase.initializeApp(config)

export const auth = firebase.auth
export const db = firebase.database() //firebase.firestore()

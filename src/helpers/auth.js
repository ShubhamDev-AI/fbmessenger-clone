import { auth } from "../services/firebase"

export function signup(email, password, photoURL) {
  return (
    //1) auth().createUserWithEmailAndPassword()
    auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        auth().currentUser
          .updateProfile({ displayName: email, photoURL })
      })
  )
}

export function signin(email, password) {
  //2) auth().signInWithEmailAndPassword()
  return auth().signInWithEmailAndPassword(email, password)
}

export function signInWithGoogle() {
  const provider = new auth.GoogleAuthProvider()
  //3) auth().signInWithPopup()
  return auth().signInWithPopup(provider)
}

export function signInWithGitHub() {
  const provider = new auth.GithubAuthProvider()
  //4) auth().signInWithPopup()
  return auth().signInWithPopup(provider)
}

export function logout() {
  //5) auth().signOut()
  return auth().signOut()
}

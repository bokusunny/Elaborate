import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

try {
  if (
    process.env.FIREBASE_API_KEY === undefined ||
    process.env.FIREBASE_MESSAGING_SENDER_ID === undefined
  ) {
    throw '.env has not been set. Please make sure your root dir.'
  }
} catch (e) {
  console.error(e)
}

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'progate-mafia-tmp.firebaseapp.com',
  databaseURL: 'https://progate-mafia-tmp.firebaseio.com',
  projectId: 'progate-mafia-tmp',
  storageBucket: 'progate-mafia-tmp.appspot.com',
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
}

firebase.initializeApp(config)

const auth = firebase.auth()
const db = firebase.firestore()

export { firebase, auth, db }

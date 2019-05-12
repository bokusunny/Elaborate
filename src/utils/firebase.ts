import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

try {
  if (
    process.env.FIREBASE_API_KEY === undefined ||
    process.env.FIREBASE_AUTH_ADMIN === undefined ||
    process.env.FIREBASE_DATABASE_URL === undefined ||
    process.env.FIREBASE_FIREBASE_PROJECT_ID === undefined ||
    process.env.FIREBASE_FIREBASE_STORAGE_BUCKET === undefined ||
    process.env.FIREBASE_MESSAGING_SENDER_ID === undefined
  ) {
    throw '.env has not been set. Please make sure your root dir.'
  }
} catch (e) {
  console.error(e)
}

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_ADMIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
}

firebase.initializeApp(config)

const auth = firebase.auth()
const db = firebase.firestore()

export type FirebaseSnapShot = firebase.firestore.QueryDocumentSnapshot
export { firebase, auth, db }

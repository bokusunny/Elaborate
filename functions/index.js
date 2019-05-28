const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp()

const db = admin.firestore()

exports.createUserDocument = functions.auth.user().onCreate(user => {
  const { uid, displayName, email } = user

  db.collection('users')
    .doc(uid)
    .set({
      name: displayName,
      email,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
})

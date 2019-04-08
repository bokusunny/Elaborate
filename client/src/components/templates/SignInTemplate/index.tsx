import React, { Fragment, useState, useEffect } from 'react'
import firebase from '../../../firebase'
import SNSSignInButton from '../../atoms/Buttons/SNSSigiInButton'

interface Props {
  onClick: () => void
}

type User = firebase.User | null

const onClickGoogleSignin = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithRedirect(provider)
}

const onClickSignOut = () => {
  firebase.auth().signOut()
}

const SignInTemplate: React.FC<Props> = ({ onClick }) => {
  const [currentUser, setCurrentUser] = useState<User>(null)
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setCurrentUser(user)
    })
  })

  return !currentUser ? (
    <Fragment>
      <SNSSignInButton type="google" onClick={onClickGoogleSignin}>
        Login with Google
      </SNSSignInButton>
      <SNSSignInButton type="twitter" onClick={onClick}>
        Login with Twitter
      </SNSSignInButton>
      <SNSSignInButton type="facebook" onClick={onClick}>
        Login with Facebook
      </SNSSignInButton>
    </Fragment>
  ) : (
    <Fragment>
      <p>Hello, {currentUser.email}👋</p>
      <button onClick={onClickSignOut}>Signout</button>
    </Fragment>
  )
}

export default SignInTemplate

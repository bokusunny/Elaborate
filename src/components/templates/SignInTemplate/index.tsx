import React, { Fragment } from 'react'
import { firebase, auth, db } from '../../../utils/firebase'
import SNSSignInButton from '../../atoms/Buttons/SNSSigiInButton'

interface Props {
  onClick: () => void
}

const onClickGoogleSignin = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  auth.signInWithRedirect(provider)
}

const onClickTwitterSignin = () => {
  db.collection('users')
    .add({
      name: 'ninjawanko',
      email: 'ninjawanko@example.com',
    })
    .then(docRef => alert(`Successfully added! Your user id is ${docRef.id}.`))
    .catch(error => console.error(error))
}

const SignInTemplate: React.FC<Props> = ({ onClick }) => (
  <Fragment>
    <SNSSignInButton type="google" onClick={onClickGoogleSignin}>
      Login with Google
    </SNSSignInButton>
    <SNSSignInButton type="twitter" onClick={onClickTwitterSignin}>
      Login with Twitter
    </SNSSignInButton>
    <SNSSignInButton type="facebook" onClick={onClick}>
      Login with Facebook
    </SNSSignInButton>
  </Fragment>
)

export default SignInTemplate

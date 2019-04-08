import React, { Fragment } from 'react'
import firebase from '../../../utils/firebase'
import SNSSignInButton from '../../atoms/Buttons/SNSSigiInButton'

interface Props {
  onClick: () => void
}

const onClickGoogleSignin = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  firebase.auth().signInWithRedirect(provider)
}

const SignInTemplate: React.FC<Props> = ({ onClick }) => (
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
)

export default SignInTemplate

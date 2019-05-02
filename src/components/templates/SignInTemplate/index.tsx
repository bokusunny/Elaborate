import React, { Fragment } from 'react'
import { firebase, auth } from '../../../utils/firebase'
import SNSSignInButton from '../../atoms/Buttons/SNSSigiInButton'

interface Props {
  onClick: () => void
}

const onClickGoogleSignin = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  auth
    .signInWithRedirect(provider)
    .catch((error: firebase.auth.Error) => console.error(error.message))
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

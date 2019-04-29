import React from 'react'
// import React, { Fragment } from 'react'
// import { firebase, auth } from '../../../utils/firebase'
// import SNSSignInButton from '../../atoms/Buttons/SNSSigiInButton'
import SignInHeader from '../../molecules/Headers/SignInHeader'
import * as styles from './style.css'

interface Props {
  onClick: () => void
}

// const onClickGoogleSignin = () => {
//   const provider = new firebase.auth.GoogleAuthProvider()
//   auth.signInWithRedirect(provider)
// }

// const SignInTemplate: React.FC<Props> = ({ onClick }) => {
const SignInTemplate: React.FC<Props> = () => {
  const { SignIn } = styles
  return (
    <div className={SignIn}>
      <SignInHeader />
      {/* <SNSSignInButton type="google" onClick={onClickGoogleSignin}>
        Login with Google
      </SNSSignInButton>
      <SNSSignInButton type="twitter" onClick={onClick}>
        Login with Twitter
      </SNSSignInButton>
      <SNSSignInButton type="facebook" onClick={onClick}>
        Login with Facebook
      </SNSSignInButton> */}
    </div>
  )
}

export default SignInTemplate

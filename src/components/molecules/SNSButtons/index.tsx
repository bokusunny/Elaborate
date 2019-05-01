import React, { Fragment } from 'react'
import { firebase, auth } from '../../../utils/firebase'
import SNSSignInButton from '../../atoms/Buttons/SNSSigiInButton'

interface Props {
  type?: 'Sign in' | 'Sign up'
  onClick: () => void
}

const onClickGoogleSignin = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  auth.signInWithRedirect(provider)
}

const SNSButtons: React.FC<Props> = ({ type, onClick }) => {
  return (
    <Fragment>
      <SNSSignInButton type="google" onClick={onClickGoogleSignin}>
        {`${type} with Google`}
      </SNSSignInButton>
      <SNSSignInButton type="twitter" onClick={onClick}>
        {`${type} with Twiiter`}
      </SNSSignInButton>
      <SNSSignInButton type="facebook" onClick={onClick}>
        {`${type} with Facebook`}
      </SNSSignInButton>
    </Fragment>
  )
}

export default SNSButtons

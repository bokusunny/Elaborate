import React from 'react'
import { firebase, auth } from '../../../utils/firebase'
import SNSSignInButton from '../../atoms/Buttons/SNSSigiInButton'
import * as styles from './style.css'

interface Props {
  type?: 'Sign in' | 'Sign up'
  onClick: () => void
}

const onClickGoogleSignin = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  auth.signInWithRedirect(provider)
}

const { buttonsWrapper, modalTitle, welcomeMessage, modalElaborate } = styles

const SNSButtons: React.FC<Props> = ({ type, onClick }) => {
  return (
    <div className={buttonsWrapper}>
      <h2 className={welcomeMessage}>
        {`Welcome ${type === 'Sign in' ? 'back' : ''} to`}
        <span className={modalElaborate}>Elaborate</span>
      </h2>
      <p className={modalTitle}>{`${type} with`}</p>
      <SNSSignInButton type="google" onClick={onClickGoogleSignin} />
      <SNSSignInButton type="twitter" onClick={onClick} />
      <SNSSignInButton type="facebook" onClick={onClick} />
    </div>
  )
}

export default SNSButtons

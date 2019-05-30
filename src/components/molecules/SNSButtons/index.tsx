import React from 'react'
import Alert from 'react-s-alert'
import { firebase, auth } from '../../../utils/firebase'
import SNSSignInButton from '../../atoms/Buttons/SNSSigiInButton'
import * as styles from './style.css'
const { buttonsWrapper, modalTitle, welcomeMessage, modalElaborate } = styles

interface Props {
  type: 'Sign in' | 'Sign up' | null
}

const onClickGoogleSignin = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  auth.signInWithPopup(provider).then(() => {
    setTimeout(() => Alert.info('Successfully signed in!'), 800)
  })
}

const onClickTwitterSignin = () => {
  const provider = new firebase.auth.TwitterAuthProvider()
  auth.signInWithPopup(provider).then(() => {
    setTimeout(() => Alert.info('Successfully signed in!'), 800)
  })
}

const SNSButtons: React.FC<Props> = ({ type }) => {
  return (
    <div className={buttonsWrapper}>
      <h2 className={welcomeMessage}>
        Welcome {type === 'Sign in' && 'back '}to
        <span className={modalElaborate}>Elaborate</span>
      </h2>
      <p className={modalTitle}>{`${type} with`}</p>
      <SNSSignInButton type="google" onClick={onClickGoogleSignin} />
      <SNSSignInButton type="twitter" onClick={onClickTwitterSignin} />
      <SNSSignInButton
        disabled
        type="facebook"
        onClick={() => alert(`Sorry, Facebook auth is not available now...`)}
      />
    </div>
  )
}

export default SNSButtons

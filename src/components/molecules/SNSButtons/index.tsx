import React from 'react'
import { connect } from 'react-redux'
import Alert from 'react-s-alert'
import { firebase, auth } from '../../../utils/firebase'
import SNSSignInButton from '../../atoms/Buttons/SNSSignInButton'
import { createUser } from '../../../actions/users'
import * as styles from './style.css'
const { buttonsWrapper, modalTitle, welcomeMessage, modalElaborate } = styles

interface Props {
  type: 'Sign in' | 'Sign up' | null
  createUser: () => Promise<void>
}

const onClickGoogleSignin = () => {
  const provider = new firebase.auth.GoogleAuthProvider()
  auth.signInWithPopup(provider).then(res => {
    const user = res.user as firebase.User
    user.getIdToken().then(token => {
      localStorage.setItem('elaborate-jwt', token)
    })
    setTimeout(() => Alert.info('Successfully signed in!'), 800)
  })
}

const onClickTwitterSignin = () => {
  const provider = new firebase.auth.TwitterAuthProvider()
  auth.signInWithPopup(provider).then(res => {
    const user = res.user as firebase.User
    user.getIdToken().then(token => {
      localStorage.setItem('elaborate-jwt', token)
    })
    setTimeout(() => Alert.info('Successfully signed in!'), 800)
  })
}

const SNSButtons: React.FC<Props> = ({ type, createUser }) => {
  return (
    <div className={buttonsWrapper}>
      <h2 className={welcomeMessage}>
        Welcome {type === 'Sign in' && 'back '}to
        <span className={modalElaborate}>Elaborate</span>
      </h2>
      <p className={modalTitle}>{`${type} with`}</p>
      <SNSSignInButton type="google" onClick={onClickGoogleSignin} />
      <SNSSignInButton type="twitter" onClick={onClickTwitterSignin} />
      {/* TODO: 一時的に一番影響が小さそうなfacebookボタンでaxiosをテスト、あとで削除する */}
      <SNSSignInButton disabled type="facebook" onClick={() => createUser()} />
    </div>
  )
}

export default connect(
  null,
  { createUser }
)(SNSButtons)

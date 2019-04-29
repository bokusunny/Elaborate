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

const title = 'Let you be\nmore creative.'
const message = `We believe words of wisdom are always created after deep deliberations.\n
  Who’s heart do you like to move with Elaborate?\n
  This is a creative workspace for you to "elaborate" your message.
`

// const SignInTemplate: React.FC<Props> = ({ onClick }) => {
const SignInTemplate: React.FC<Props> = () => {
  const { SignIn, messageWrapper, catchCopy, catchCopyText, description, descriptionText } = styles

  return (
    <div className={SignIn}>
      <SignInHeader />
      <div className={messageWrapper}>
        <div className={catchCopy}>
          {title.split('\n').map((text, index) => {
            return (
              <p className={catchCopyText} key={index}>
                {text}
              </p>
            )
          })}
        </div>
        <div className={description}>
          {message.split('\n').map((text, index) => {
            return (
              <p className={descriptionText} key={index}>
                {text}
              </p>
            )
          })}
        </div>
      </div>
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

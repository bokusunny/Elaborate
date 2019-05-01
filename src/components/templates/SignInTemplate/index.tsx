import React from 'react'
import Modal from '@material-ui/core/Modal'
import SNSButtons from '../../molecules/SNSButtons'
import SignInHeader from '../../molecules/Headers/SignInHeader'
import * as styles from './style.css'

interface Props {
  title: string
  message: string
  onClick: () => void
}

const SignInTemplate: React.FC<Props> = ({ title, message, onClick }) => {
  const {
    SignInTemplateWrapper,
    messageWrapper,
    catchCopy,
    catchCopyText,
    description,
    descriptionText,
  } = styles

  return (
    <div className={SignInTemplateWrapper}>
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
      <Modal open={false}>
        <SNSButtons type="Sign In" onClick={onClick} />
      </Modal>
    </div>
  )
}

export default SignInTemplate

import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Modal from '@material-ui/core/Modal'
import { setIsModalOpen } from '../../../actions/authentications'
import { Authentication } from '../../../reducers/authentications'
import SNSButtons from '../../molecules/SNSButtons'
import SignInHeader from '../../molecules/Headers/SignInHeader'
import * as styles from './style.css'

interface Props {
  authentications: Authentication
  setIsModalOpen: (isModalOpen: boolean, authenticationType?: 'Sign in' | 'Sign up') => void
  title: string
  message: string
  onClick: () => void
}

const SignInTemplate: React.FC<Props> = ({
  authentications,
  setIsModalOpen,
  title,
  message,
  onClick,
}) => {
  const { isModalOpen, authenticationType } = authentications

  const [modalState, setModalState] = useState(isModalOpen)
  useEffect(() => {
    setModalState(isModalOpen)
  }, [isModalOpen])

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
      <Modal
        open={modalState}
        onBackdropClick={() => {
          setIsModalOpen(false)
        }}
      >
        <SNSButtons type={authenticationType} onClick={onClick} />
      </Modal>
    </div>
  )
}

export default connect(
  null,
  { setIsModalOpen }
)(SignInTemplate)

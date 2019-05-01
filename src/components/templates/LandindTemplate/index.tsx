import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Modal from '@material-ui/core/Modal'
import { AuthenticationModalClose } from '../../../actions/modals'
import { AuthenticationModal } from '../../../reducers/modals'
import SNSButtons from '../../molecules/SNSButtons'
import Header from '../../molecules/Header'
import LandingMesasge from '../../molecules/LandingMessage'
import * as styles from './style.css'

interface Props {
  authenticationModals: AuthenticationModal
  AuthenticationModalClose: () => void
}

const LandingTemplate: React.FC<Props> = ({ authenticationModals, AuthenticationModalClose }) => {
  const { authenticationModalOpen, authenticationType } = authenticationModals

  const [modalState, setModalState] = useState(authenticationModalOpen)
  useEffect(() => {
    setModalState(authenticationModalOpen)
  }, [authenticationModalOpen])

  const { LandingTemplateWrapper } = styles

  return (
    <div className={LandingTemplateWrapper}>
      <Header />
      <LandingMesasge />
      <Modal
        open={modalState}
        onBackdropClick={() => {
          AuthenticationModalClose()
        }}
      >
        <SNSButtons
          type={authenticationType}
          onClick={() => alert('For now, Google Auth is only available...')}
        />
      </Modal>
    </div>
  )
}

export default connect(
  null,
  { AuthenticationModalClose }
)(LandingTemplate)

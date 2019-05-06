import React from 'react'
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

const { LandingTemplateWrapper } = styles

const LandingTemplate: React.FC<Props> = ({ authenticationModals, AuthenticationModalClose }) => {
  const { isAuthModalOpen, authenticationType } = authenticationModals

  return (
    <div className={LandingTemplateWrapper}>
      <Header colorType="blueBase" pageType="route" />
      <LandingMesasge />
      <Modal
        open={isAuthModalOpen}
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

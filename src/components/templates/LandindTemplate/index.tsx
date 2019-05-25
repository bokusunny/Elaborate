import React from 'react'
import { connect } from 'react-redux'
import * as H from 'history'
import Modal from '@material-ui/core/Modal'
import { AuthenticationModalClose } from '../../../actions/modals'
import { AuthenticationModal } from '../../../reducers/modals'
import SNSButtons from '../../molecules/SNSButtons'
import Header from '../../organisms/Header'
import LandingMesasge from '../../molecules/LandingMessage'
import * as styles from './style.css'

interface Props {
  authenticationModals: AuthenticationModal
  AuthenticationModalClose: () => void
  history: H.History
}

const { LandingTemplateWrapper } = styles

const LandingTemplate: React.FC<Props> = ({
  authenticationModals,
  AuthenticationModalClose,
  history,
}) => {
  const { isAuthModalOpen, authenticationType } = authenticationModals

  return (
    <div className={LandingTemplateWrapper}>
      <Header colorType="blueBase" pageType="landing" history={history} />
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

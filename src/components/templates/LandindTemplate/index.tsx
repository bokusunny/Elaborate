import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import * as H from 'history'
import Modal from '@material-ui/core/Modal'
import { AuthenticationModalClose } from '../../../actions/modals'
import { AuthenticationModal } from '../../../reducers/modals'
import SNSButtons from '../../molecules/SNSButtons'
import Header from '../../organisms/Header'
import LandingMesasge from '../../molecules/LandingMessage'
import DisclaimerMessage from '../../organisms/DisclaimerMessage'
import * as styles from './style.css'

interface Props {
  authenticationModals: AuthenticationModal
  AuthenticationModalClose: () => void
  history: H.History
}

const { LandingTemplateWrapper } = styles

const isDevisePC = (ua: string): boolean => {
  if (
    ua.indexOf('iphone') > 0 ||
    ua.indexOf('android') > 0 ||
    ua.indexOf('mobile') > 0 ||
    ua.indexOf('ipad') > 0
  ) {
    return false
  }

  return true
}

const LandingTemplate: React.FC<Props> = ({
  authenticationModals,
  AuthenticationModalClose,
  history,
}) => {
  const { isAuthModalOpen, authenticationType } = authenticationModals

  const ua = window.navigator.userAgent.toLowerCase()
  const isPermittedToAccess = isDevisePC(ua)

  return (
    <div className={LandingTemplateWrapper}>
      {isPermittedToAccess ? (
        <Fragment>
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
        </Fragment>
      ) : (
        <DisclaimerMessage />
      )}
    </div>
  )
}

export default connect(
  null,
  { AuthenticationModalClose }
)(LandingTemplate)

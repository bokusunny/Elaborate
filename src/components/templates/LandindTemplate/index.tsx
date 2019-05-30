import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as H from 'history'
import Modal from '@material-ui/core/Modal'
import { AuthenticationModalClose } from '../../../actions/modals'
import SNSButtons from '../../molecules/SNSButtons'
import Header from '../../organisms/Header'
import LandingMesasge from '../../molecules/LandingMessage'
import DisclaimerMessage from '../../organisms/DisclaimerMessage'
import { OpenModalType } from '../../../common/static-types'
import * as styles from './style.css'
const { LandingTemplateWrapper } = styles

interface Props {
  history: H.History
}

const getIsDevicePC = (): boolean => {
  const ua = window.navigator.userAgent.toLowerCase()
  return !(
    ua.indexOf('iphone') > 0 ||
    ua.indexOf('android') > 0 ||
    ua.indexOf('mobile') > 0 ||
    ua.indexOf('ipad') > 0
  )
}

const LandingTemplate: React.FC<Props> = ({ history }) => {
  const [openModalType, setOpenModalType] = useState<OpenModalType>(null)

  const isDevicePC = getIsDevicePC()
  if (!isDevicePC) return <DisclaimerMessage />

  return (
    <div className={LandingTemplateWrapper}>
      <Header
        colorType="blueBase"
        pageType="landing"
        history={history}
        handleModalOpen={setOpenModalType}
      />
      <LandingMesasge />
      <Modal open={Boolean(openModalType)} onBackdropClick={() => setOpenModalType(null)}>
        <SNSButtons type={openModalType} />
      </Modal>
    </div>
  )
}

export default connect(
  null,
  { AuthenticationModalClose }
)(LandingTemplate)

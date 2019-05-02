import React from 'react'
import { connect } from 'react-redux'
import { AuthenticationModal } from '../../../reducers/modals'
import LandingTemplate from '../../templates/LandindTemplate'

interface Props {
  authenticationModals: AuthenticationModal
}

const LandingPage: React.FC<Props> = ({ authenticationModals }) => (
  <LandingTemplate authenticationModals={authenticationModals} />
)

export default connect(
  ({ authenticationModals }: Record<string, AuthenticationModal>) => ({
    authenticationModals,
  }),
  null
)(LandingPage)

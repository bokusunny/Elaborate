import React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { AuthenticationModal } from '../../../reducers/modals'
import LandingTemplate from '../../templates/LandindTemplate'

interface Props extends RouteComponentProps {
  authenticationModals: AuthenticationModal
}

const LandingPage: React.FC<Props> = ({ authenticationModals, history }) => (
  <LandingTemplate authenticationModals={authenticationModals} history={history} />
)

export default connect(
  ({ authenticationModals }: Record<string, AuthenticationModal>) => ({
    authenticationModals,
  }),
  null
)(LandingPage)

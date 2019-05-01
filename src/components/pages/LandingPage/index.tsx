import React from 'react'
import { connect } from 'react-redux'
import { Authentication } from '../../../reducers/authentications'
import LandingTemplate from '../../templates/LandindTemplate'

const title = 'Let you be\nmore creative.'
const message = `
  We believe words of wisdom are always created after deep deliberations.\n
  Who’s heart do you like to move with Elaborate?\n
  This is a creative workspace for you to "elaborate" your message.
`

interface Props {
  authentications: Authentication
}

const LandingPage: React.FC<Props> = ({ authentications }) => (
  <LandingTemplate
    authentications={authentications}
    title={title}
    message={message}
    onClick={() => alert('For now, Google Auth is only available...')}
  />
)

export default connect(
  ({ authentications }: Record<string, Authentication>) => ({
    authentications,
  }),
  null
)(LandingPage)

import React from 'react'
import SignInPageTemplate from '../../templates/SignInTemplate'

const title = 'Let you be\nmore creative.'
const message = `
  We believe words of wisdom are always created after deep deliberations.\n
  Who’s heart do you like to move with Elaborate?\n
  This is a creative workspace for you to "elaborate" your message.
`

const SignInPage: React.FC<{}> = () => (
  <SignInPageTemplate
    title={title}
    message={message}
    onClick={() => alert('For now, Google Auth is only available...')}
  />
)

export default SignInPage

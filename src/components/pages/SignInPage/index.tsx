import React from 'react'
import SignInPageTemplate from '../../templates/SignInTemplate'

const SignInPage: React.FC<{}> = () => (
  <SignInPageTemplate onClick={() => alert('For now, Google Auth is only available...')} />
)

export default SignInPage

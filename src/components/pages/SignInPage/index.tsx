import React from 'react'
import MyPageTemplate from '../../templates/SignInTemplate'

const SignInPage: React.FC<{}> = () => (
  <MyPageTemplate onClick={() => alert('For now, Google Auth is only available...')} />
)

export default SignInPage

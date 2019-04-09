import React from 'react'
import MyPageTemplate from '../../templates/SignInTemplate'

const SignInPage: React.FC<{}> = () => (
  <MyPageTemplate onClick={() => alert('Now just google authentication is available...')} />
)

export default SignInPage

import React from 'react'
import MyPageTemplate from '../../templates/SignInTemplate'

const SignInPage: React.FC<{}> = (): JSX.Element => (
  <MyPageTemplate onClick={() => console.log('Login!')} />
)

export default SignInPage

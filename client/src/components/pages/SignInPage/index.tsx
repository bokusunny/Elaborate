import React from 'react'
import MyPageTemplate from '../../templates/SignInTemplate'

const SignInPage: React.FC<{}> = () => <MyPageTemplate onClick={() => console.log('Login!')} />

export default SignInPage

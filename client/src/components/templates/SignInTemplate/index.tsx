import React, { Fragment } from 'react'
import Button from '../../atoms/Buttons/SNSSigiInButton'

interface Props {
  onClick: () => void
}

const SignInTemplate: React.FC<Props> = ({ onClick }) => (
  <Fragment>
    <Button type="google" onClick={onClick}>
      Login with Google
    </Button>
    <Button type="twitter" onClick={onClick}>
      Login with Twitter
    </Button>
    <Button type="facebook" onClick={onClick}>
      Login with Facebook
    </Button>
  </Fragment>
)

export default SignInTemplate

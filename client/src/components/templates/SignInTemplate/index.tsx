import React from 'react'
import Button from '../../atoms/Button'

interface Props {
  onClick: () => void
}

const SignInTemplate: React.FC<Props> = ({ onClick }) => <Button onClick={onClick}>Login</Button>

export default SignInTemplate

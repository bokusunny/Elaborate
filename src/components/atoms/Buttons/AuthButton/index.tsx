import React from 'react'
import * as styles from './style.css'

interface Props {
  buttonName: 'Continue with Elaborate' | 'Get started'
  onClick: () => void
}

const AuthButton: React.FC<Props> = ({ buttonName, onClick }) => {
  const { AuthButton } = styles
  return (
    <div className={AuthButton} onClick={onClick}>
      {buttonName}
    </div>
  )
}

export default AuthButton

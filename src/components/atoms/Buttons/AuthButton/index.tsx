import React from 'react'
import * as styles from './style.css'

interface Props {
  buttonName: 'Continue with Elaborate' | 'Get started' | 'Sign out'
  colorType: 'blueBase' | 'whiteBase'
  onClick: () => void
}

const AuthButton: React.FC<Props> = ({ buttonName, colorType, onClick }) => {
  const { AuthButtonBlueBase, AuthButtonWhiteBase } = styles
  return (
    <div
      className={colorType === 'blueBase' ? AuthButtonBlueBase : AuthButtonWhiteBase}
      onClick={onClick}
    >
      {buttonName}
    </div>
  )
}

export default AuthButton

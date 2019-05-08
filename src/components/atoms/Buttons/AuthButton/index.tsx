import React from 'react'
import * as styles from './style.css'

interface Props {
  buttonName: 'Continue with Elaborate' | 'Get started' | 'Sign out'
  colorType: 'blueBase' | 'whiteBase'
  onClick: () => void
}

const AuthButton: React.FC<Props> = ({ buttonName, colorType, onClick }) => {
  return (
    <div className={styles[colorType]} onClick={onClick}>
      {buttonName}
    </div>
  )
}

export default AuthButton

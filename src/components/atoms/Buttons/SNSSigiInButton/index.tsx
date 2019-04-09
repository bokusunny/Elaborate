import React from 'react'
import * as styles from './style.css'

interface Props {
  type: 'google' | 'twitter' | 'facebook'
  onClick: () => void
  children: string
}

const SNSSignInButton: React.FC<Props> = ({ type, onClick, children }) => {
  const { button } = styles
  const buttonType = styles[type]

  return (
    <a className={`${button} ${buttonType}`} onClick={onClick}>
      {children}
    </a>
  )
}

export default SNSSignInButton

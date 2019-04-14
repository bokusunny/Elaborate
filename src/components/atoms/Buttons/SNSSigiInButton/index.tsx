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
  const socialIcon = () => {
    switch (type) {
      case 'google':
        return 'fab fa-google'
      case 'twitter':
        return 'fab fa-twitter-square'
      case 'facebook':
        return 'fab fa-facebook-square'
    }
  }

  return (
    <a className={`${button} ${buttonType}`} onClick={onClick}>
      <i className={socialIcon()} />
      {children}
    </a>
  )
}

export default SNSSignInButton

import React from 'react'
import * as styles from './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons'

interface Props {
  type: 'google' | 'twitter' | 'facebook'
  onClick: () => void
}

const getIconSns = (type: 'google' | 'twitter' | 'facebook') => {
  switch (type) {
    case 'google':
      return <FontAwesomeIcon icon={faGoogle} />
    case 'twitter':
      return <FontAwesomeIcon icon={faTwitter} />
    case 'facebook':
      return <FontAwesomeIcon icon={faFacebookF} />
  }
}

const SNSSignInButton: React.FC<Props> = ({ type, onClick }) => {
  const { button, imageSns } = styles
  const buttonType = styles[type]

  const iconSns = getIconSns(type)

  return (
    <a className={`${button} ${buttonType}`} onClick={onClick}>
      <span className={imageSns}>{iconSns}</span>
    </a>
  )
}

export default SNSSignInButton

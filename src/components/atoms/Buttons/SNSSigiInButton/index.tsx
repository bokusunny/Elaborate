import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons'
import * as styles from './style.css'
const { button, imageSns, disabled } = styles

interface Props {
  disabled?: boolean
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

const SNSSignInButton: React.FC<Props> = ({ disabled: propsDisabled, type, onClick }) => {
  const iconSns = getIconSns(type)

  return (
    <a className={`${button} ${styles[type]} ${propsDisabled ? disabled : ''}`} onClick={onClick}>
      <span className={imageSns}>{iconSns}</span>
    </a>
  )
}

export default SNSSignInButton

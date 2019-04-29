import React from 'react'
import * as styles from './style.css'

interface Props {
  buttonName: string
}

const SingInUpButton: React.FC<Props> = ({ buttonName }) => {
  const { SingInUpButton } = styles
  return <div className={SingInUpButton}>{buttonName}</div>
}

export default SingInUpButton

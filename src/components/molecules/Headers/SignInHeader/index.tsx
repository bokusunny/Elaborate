import React from 'react'
import SignInUpButton from '../../../atoms/Buttons/SignInUpButton'
import * as styles from './style.css'

const SingInHeader: React.FC<{}> = () => {
  const { SingInHeader, title, buttons } = styles
  return (
    <div className={SingInHeader}>
      <div className={title}>Elaborate</div>
      <div className={buttons}>
        <SignInUpButton buttonName="Continue with Elaborate" />
        <SignInUpButton buttonName="Get started" />
      </div>
    </div>
  )
}

export default SingInHeader

import React from 'react'
import { connect } from 'react-redux'
import SignInUpButton from '../../../atoms/Buttons/SignInUpButton'
import { setIsModalOpen } from '../../../../actions/authentications'
import * as styles from './style.css'

interface Props {
  setIsModalOpen: (isModalOpen: boolean) => void
}

const SingInHeader: React.FC<Props> = ({ setIsModalOpen }) => {
  const { SingInHeader, title, buttons } = styles
  return (
    <div className={SingInHeader}>
      <div className={title}>Elaborate</div>
      <div className={buttons}>
        <div
          onClick={() => {
            setIsModalOpen(true)
          }}
        >
          <SignInUpButton buttonName="Continue with Elaborate" />
        </div>
        <div
          onClick={() => {
            setIsModalOpen(true)
          }}
        >
          <SignInUpButton buttonName="Get started" />
        </div>
      </div>
    </div>
  )
}

export default connect(
  null,
  { setIsModalOpen }
)(SingInHeader)

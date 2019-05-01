import React from 'react'
import { connect } from 'react-redux'
import SignInUpButton from '../../atoms/Buttons/SignInUpButton'
import { AuthenticatoinModalOpen } from '../../../actions/modals'
import * as styles from './style.css'

interface Props {
  AuthenticatoinModalOpen: (authenticationType: 'Sign in' | 'Sign up') => void
}

const Header: React.FC<Props> = ({ AuthenticatoinModalOpen }) => {
  const { Header, title, buttons } = styles
  return (
    <div className={Header}>
      <div className={title}>Elaborate</div>
      <div className={buttons}>
        <div
          onClick={() => {
            AuthenticatoinModalOpen('Sign in')
          }}
        >
          <SignInUpButton buttonName="Continue with Elaborate" />
        </div>
        <div
          onClick={() => {
            AuthenticatoinModalOpen('Sign up')
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
  { AuthenticatoinModalOpen }
)(Header)

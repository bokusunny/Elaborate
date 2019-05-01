import React from 'react'
import { connect } from 'react-redux'
import SignInUpButton from '../../atoms/Buttons/SignInUpButton'
import { AuthenticationModalOpen } from '../../../actions/modals'
import * as styles from './style.css'

interface Props {
  AuthenticationModalOpen: (authenticationType: 'Sign in' | 'Sign up') => void
}

const Header: React.FC<Props> = ({ AuthenticationModalOpen }) => {
  const { Header, title, buttons } = styles
  return (
    <div className={Header}>
      <div className={title}>Elaborate</div>
      <div className={buttons}>
        <SignInUpButton
          buttonName="Continue with Elaborate"
          onClick={() => {
            AuthenticationModalOpen('Sign in')
          }}
        />
        <SignInUpButton
          buttonName="Get started"
          onClick={() => {
            AuthenticationModalOpen('Sign up')
          }}
        />
      </div>
    </div>
  )
}

export default connect(
  null,
  { AuthenticationModalOpen }
)(Header)

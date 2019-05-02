import React from 'react'
import { connect } from 'react-redux'
import AuthButton from '../AuthButton'
import { AuthenticationModalOpen } from '../../../../actions/modals'
import * as styles from './style.css'

interface Props {
  AuthenticationModalOpen: (authenticationType: 'Sign in' | 'Sign up') => void
}

const { buttons } = styles

const AuthButtons: React.FC<Props> = ({ AuthenticationModalOpen }) => (
  <div className={buttons}>
    <AuthButton
      buttonName="Continue with Elaborate"
      colorType="blueBase"
      onClick={() => {
        AuthenticationModalOpen('Sign in')
      }}
    />
    <AuthButton
      buttonName="Get started"
      colorType="blueBase"
      onClick={() => {
        AuthenticationModalOpen('Sign up')
      }}
    />
  </div>
)

export default connect(
  null,
  { AuthenticationModalOpen }
)(AuthButtons)

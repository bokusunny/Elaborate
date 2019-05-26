import React from 'react'
import { connect } from 'react-redux'
import BasicButton from '../../atoms/Buttons/BasicButton'
import { AuthenticationModalOpen } from '../../../actions/modals'
import * as styles from './style.css'

interface Props {
  AuthenticationModalOpen: (authenticationType: 'Sign in' | 'Sign up') => void
}

const { buttons } = styles

const AuthButtons: React.FC<Props> = ({ AuthenticationModalOpen }) => (
  <div className={buttons}>
    <BasicButton colorType="blueBase" onClick={() => AuthenticationModalOpen('Sign in')}>
      Continue with Elaborate
    </BasicButton>
    <BasicButton colorType="blueBase" onClick={() => AuthenticationModalOpen('Sign up')}>
      Get started
    </BasicButton>
  </div>
)

export default connect(
  null,
  { AuthenticationModalOpen }
)(AuthButtons)

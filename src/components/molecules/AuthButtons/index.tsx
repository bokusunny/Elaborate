import React from 'react'
import { connect } from 'react-redux'
import BasicButton from '../../atoms/Buttons/BasicButton'
import { AuthenticationModalOpen } from '../../../actions/modals'
import { OpenModalType } from '../../../common/static-types'
import * as styles from './style.css'

interface Props {
  AuthenticationModalOpen: (authenticationType: 'Sign in' | 'Sign up') => void
  handleModalOpen: React.Dispatch<React.SetStateAction<OpenModalType>>
}

const { buttons } = styles

const AuthButtons: React.FC<Props> = ({ handleModalOpen }) => (
  <div className={buttons}>
    <BasicButton colorType="blueBase" onClick={() => handleModalOpen('Sign in')}>
      Continue with Elaborate
    </BasicButton>
    <BasicButton colorType="blueBase" onClick={() => handleModalOpen('Sign up')}>
      Get started
    </BasicButton>
  </div>
)

export default connect(
  null,
  { AuthenticationModalOpen }
)(AuthButtons)

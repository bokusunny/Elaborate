import React from 'react'
import BasicButton from '../../atoms/Buttons/BasicButton'
import { OpenModalType } from '../../../common/static-types'
import * as styles from './style.css'
const { buttons } = styles

interface Props {
  handleModalOpen: React.Dispatch<React.SetStateAction<OpenModalType>>
}

const AuthButtons: React.FC<Props> = ({ handleModalOpen }) => (
  <div className={buttons}>
    <BasicButton className="auth" onClick={() => handleModalOpen('Sign in')}>
      Continue with Elaborate
    </BasicButton>
    <BasicButton className="auth" onClick={() => handleModalOpen('Sign up')}>
      Get started
    </BasicButton>
  </div>
)

export default AuthButtons

import React from 'react'
import { auth } from '../../../utils/firebase'
import { connect } from 'react-redux'
import AuthButtons from '../../atoms/Buttons/AuthButtons'
import AuthButton from '../../atoms/Buttons/AuthButton'
import { AuthenticationModalOpen } from '../../../actions/modals'
import * as styles from './style.css'

interface Props {
  colorType: 'blueBase' | 'whiteBase'
}

const onClickSignOut = () => {
  auth.signOut()
}

const Header: React.FC<Props> = ({ colorType }) => {
  const { HeaderBlueBase, HeaderWhiteBase, title } = styles
  const headerTitle = <div className={title}>Elaborate</div>

  return colorType === 'blueBase' ? (
    <div className={HeaderBlueBase}>
      {headerTitle}
      <AuthButtons />
    </div>
  ) : (
    <div className={HeaderWhiteBase}>
      {headerTitle}
      <AuthButton buttonName="Sign out" colorType={colorType} onClick={onClickSignOut} />
    </div>
  )
}

export default connect(
  null,
  { AuthenticationModalOpen }
)(Header)

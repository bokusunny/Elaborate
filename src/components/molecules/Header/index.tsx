import React from 'react'
import { connect } from 'react-redux'
import AuthButtons from '../../atoms/Buttons/AuthButtons'
import { AuthenticationModalOpen } from '../../../actions/modals'
import * as styles from './style.css'

const Header: React.FC = () => {
  const { Header, title } = styles
  return (
    <div className={Header}>
      <div className={title}>Elaborate</div>
      <AuthButtons />
    </div>
  )
}

export default connect(
  null,
  { AuthenticationModalOpen }
)(Header)

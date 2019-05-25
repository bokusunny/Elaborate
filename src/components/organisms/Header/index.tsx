import React from 'react'
import * as H from 'history'
import { auth } from '../../../utils/firebase'
import { connect } from 'react-redux'
import HeaderRight from '../../molecules/HeaderRight'
import HeaderTitleButton from '../../atoms/Buttons/HeaderTitleButton'
import { AuthenticationModalOpen } from '../../../actions/modals'
import * as styles from './style.css'

interface Props {
  colorType: 'blueBase' | 'whiteBase'
  pageType: 'landing' | 'myPage' | 'edit' | 'diff'
  history: H.History
}

const Header: React.FC<Props> = props => (
  <header className={`${styles.header} ${styles[props.colorType]}`}>
    <HeaderTitleButton history={props.history} />
    <HeaderRight {...props} onClickSignOut={() => auth.signOut()} />
  </header>
)

export default connect(
  null,
  { AuthenticationModalOpen }
)(Header)
import React from 'react'
import * as H from 'history'
import { auth } from '../../../utils/firebase'
import { connect } from 'react-redux'
import HeaderLeft from '../../molecules/HeaderLeft'
import HeaderRight from '../../molecules/HeaderRight'
import { AuthenticationModalOpen } from '../../../actions/modals'
import * as styles from './style.css'

interface Props {
  colorType: 'blueBase' | 'whiteBase'
  pageType: 'landing' | 'myPage' | 'edit' | 'diff'
  history: H.History
  directoryName?: string
  branchName?: string
}

const Header: React.FC<Props> = ({ colorType, ...rest }) => (
  <header className={`${styles.header} ${styles[colorType]}`}>
    <HeaderLeft {...rest} />
    <HeaderRight
      colorType={colorType}
      pageType={rest.pageType}
      history={rest.history}
      onClickSignOut={() => auth.signOut()}
    />
  </header>
)

export default connect(
  null,
  { AuthenticationModalOpen }
)(Header)

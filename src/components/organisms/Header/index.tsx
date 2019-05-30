import React from 'react'
import * as H from 'history'
import { connect } from 'react-redux'
import HeaderLeft from '../../molecules/HeaderLeft'
import HeaderRight from '../../molecules/HeaderRight'
import { AuthenticationModalOpen } from '../../../actions/modals'
import { OpenModalType } from '../../../common/static-types'
import * as styles from './style.css'
import { BranchData } from '../../../actions/branches'
import { DirectoryData } from '../../../actions/directories'

interface Props {
  colorType: 'blueBase' | 'whiteBase'
  pageType: 'landing' | 'myPage' | 'edit' | 'diff'
  history: H.History
  currentDirectory?: DirectoryData
  currentBranch?: BranchData
  handleModalOpen?: React.Dispatch<React.SetStateAction<OpenModalType>>
}

const Header: React.FC<Props> = props => (
  <header className={`${styles.header} ${styles[props.colorType]}`}>
    <HeaderLeft {...props} />
    <HeaderRight
      colorType={props.colorType}
      pageType={props.pageType}
      handleModalOpen={props.handleModalOpen}
    />
  </header>
)

export default connect(
  null,
  { AuthenticationModalOpen }
)(Header)

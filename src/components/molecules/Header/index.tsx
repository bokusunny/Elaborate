import React from 'react'
import { auth } from '../../../utils/firebase'
import { connect } from 'react-redux'
import HeaderRight from '../HeaderRight'
import HeaderTitleButton from '../../atoms/Buttons/HeaderTitleButton'
import AuthButtons from '../../atoms/Buttons/AuthButtons'
import { AuthenticationModalOpen } from '../../../actions/modals'
import * as styles from './style.css'

const { HeaderBlueBase, HeaderWhiteBase } = styles

interface Props {
  colorType: 'blueBase' | 'whiteBase'
  pageType: 'route' | 'myPage' | 'edit'
}

const onClickSignOut = () => {
  auth.signOut()
}

const onClickToMyPage = () => {
  document.location.href = '/MyPage'
}

const Header: React.FC<Props> = ({ colorType, pageType }) => {
  return colorType === 'blueBase' ? (
    <div className={HeaderBlueBase}>
      <HeaderTitleButton onClick={onClickToMyPage} />
      <AuthButtons />
    </div>
  ) : (
    <div className={HeaderWhiteBase}>
      <HeaderTitleButton onClick={onClickToMyPage} />
      <HeaderRight
        colorType="whiteBase"
        pageType={pageType}
        onClickSignOut={onClickSignOut}
        onClickToMyPage={onClickToMyPage}
      />
    </div>
  )
}

export default connect(
  null,
  { AuthenticationModalOpen }
)(Header)

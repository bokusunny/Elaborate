import React from 'react'
import { auth } from '../../../utils/firebase'
import { connect } from 'react-redux'
import HeaderTitleButton from '../../atoms/Buttons/HeaderTitleButton'
import AuthButtons from '../../atoms/Buttons/AuthButtons'
import AuthButton from '../../atoms/Buttons/AuthButton'
import MyPageButton from '../../atoms/Buttons/MyPageButton'
import { AuthenticationModalOpen } from '../../../actions/modals'
import * as styles from './style.css'

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
  const { HeaderBlueBase, HeaderWhiteBase, HeaderButtonsWrapper } = styles

  if (colorType === 'blueBase') {
    return (
      <div className={HeaderBlueBase}>
        <HeaderTitleButton onClick={onClickToMyPage} />
        <AuthButtons />
      </div>
    )
  } else if (pageType === 'edit') {
    return (
      <div className={HeaderWhiteBase}>
        <HeaderTitleButton onClick={onClickToMyPage} />
        <div className={HeaderButtonsWrapper}>
          <MyPageButton colorType={colorType} onClick={onClickToMyPage} />
          <AuthButton buttonName="Sign out" colorType={colorType} onClick={onClickSignOut} />
        </div>
      </div>
    )
  } else {
    return (
      <div className={HeaderWhiteBase}>
        <HeaderTitleButton onClick={onClickToMyPage} />
        <AuthButton buttonName="Sign out" colorType={colorType} onClick={onClickSignOut} />
      </div>
    )
  }
}

export default connect(
  null,
  { AuthenticationModalOpen }
)(Header)

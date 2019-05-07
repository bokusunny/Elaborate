import React from 'react'
import MyPageButton from '../../atoms/Buttons/MyPageButton'
import AuthButton from '../../atoms/Buttons/AuthButton'
import * as styles from './style.css'

interface Props {
  colorType: 'blueBase' | 'whiteBase'
  pageType: 'landing' | 'myPage' | 'edit'
  onClickSignOut: () => void
  onClickToMyPage: () => void
}

const HeaderRight: React.FC<Props> = ({ colorType, pageType, onClickSignOut, onClickToMyPage }) => {
  return pageType === 'edit' ? (
    <div className={styles.HeaderButtonsWrapper}>
      <MyPageButton colorType={colorType} onClick={onClickToMyPage} />
      <AuthButton buttonName="Sign out" colorType={colorType} onClick={onClickSignOut} />
    </div>
  ) : (
    <AuthButton buttonName="Sign out" colorType={colorType} onClick={onClickSignOut} />
  )
}

export default HeaderRight

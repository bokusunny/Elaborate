import React from 'react'
import * as H from 'history'
import MyPageButton from '../../atoms/Buttons/MyPageButton'
import AuthButton from '../../atoms/Buttons/AuthButton'
import * as styles from './style.css'

interface Props {
  colorType: 'blueBase' | 'whiteBase'
  pageType: 'landing' | 'myPage' | 'edit' | 'diff'
  onClickSignOut: () => void
  history: H.History
}

const HeaderRight: React.FC<Props> = ({ colorType, pageType, onClickSignOut, history }) => {
  return pageType === 'edit' || pageType === 'diff' ? (
    <div className={styles.HeaderButtonsWrapper}>
      <MyPageButton colorType={colorType} onClick={() => history.push('/mypage')} />
      <AuthButton buttonName="Sign out" colorType={colorType} onClick={onClickSignOut} />
    </div>
  ) : (
    <AuthButton buttonName="Sign out" colorType={colorType} onClick={onClickSignOut} />
  )
}

export default HeaderRight

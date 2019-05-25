import React from 'react'
import * as H from 'history'
import { auth } from '../../../utils/firebase'
import AuthButtons from '../../molecules/AuthButtons'
import MyPageButton from '../../atoms/Buttons/MyPageButton'
import AuthButton from '../../atoms/Buttons/AuthButton'
import * as styles from './style.css'

interface Props {
  colorType: 'blueBase' | 'whiteBase'
  pageType: 'landing' | 'myPage' | 'edit' | 'diff'
  history: H.History
}

const HeaderRight: React.FC<Props> = ({ colorType, pageType, history }) => {
  switch (pageType) {
    case 'landing':
      return <AuthButtons />

    case 'myPage':
      return (
        <AuthButton buttonName="Sign out" colorType={colorType} onClick={() => auth.signOut()} />
      )

    case 'edit':
      return (
        <div className={styles.HeaderButtonsWrapper}>
          <MyPageButton colorType={colorType} onClick={() => history.push('/mypage')} />
          <AuthButton buttonName="Sign out" colorType={colorType} onClick={() => auth.signOut()} />
        </div>
      )

    case 'diff':
      return (
        <div className={styles.HeaderButtonsWrapper}>
          <MyPageButton colorType={colorType} onClick={() => history.push('/mypage')} />
          <AuthButton buttonName="Sign out" colorType={colorType} onClick={() => auth.signOut()} />
        </div>
      )
  }
  return <div>Sorry, something went wrong... Please reload.</div>
}

export default HeaderRight

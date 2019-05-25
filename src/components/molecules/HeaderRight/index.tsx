import React from 'react'
import * as H from 'history'
import { auth } from '../../../utils/firebase'
import AuthButtons from '../../molecules/AuthButtons'
import MyPageButton from '../../atoms/Buttons/MyPageButton'
import AuthButton from '../../atoms/Buttons/AuthButton'
import BasicButton from '../../atoms/Buttons/BasicButton'
import * as styles from './style.css'
import { BranchData } from '../../../actions/branches'
import { DirectoryData } from '../../../actions/directories'

interface Props {
  colorType: 'blueBase' | 'whiteBase'
  pageType: 'landing' | 'myPage' | 'edit' | 'diff'
  history: H.History
  currentBranch?: BranchData
  currentDirectory?: DirectoryData
}

const HeaderRight: React.FC<Props> = ({
  colorType,
  pageType,
  history,
  currentDirectory,
  currentBranch,
}) => {
  switch (pageType) {
    case 'landing':
      return <AuthButtons />

    case 'myPage':
      return (
        <AuthButton buttonName="Sign out" colorType={colorType} onClick={() => auth.signOut()} />
      )

    case 'edit': {
      const { id: directoryId } = currentDirectory as DirectoryData
      const { id: currentBranchId, baseBranchId } = currentBranch as BranchData

      return (
        <div className={styles.HeaderButtonsWrapper}>
          <BasicButton
            colorType={colorType}
            onClick={() => history.push(`/${directoryId}/diff/${baseBranchId}/${currentBranchId}`)}
          >
            Check diff
          </BasicButton>
        </div>
      )
    }

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

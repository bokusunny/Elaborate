import React, { Fragment } from 'react'
import * as H from 'history'
import BasicButton from '../../atoms/Buttons/BasicButton'
import TopicPath from '../../atoms/TopicPath'
import { BranchData } from '../../../actions/branches'
import { DirectoryData } from '../../../actions/directories'
import imgUrl from '../../../img/Logo50.png'

interface Props {
  history: H.History
  pageType: 'landing' | 'myPage' | 'edit' | 'diff'
  currentDirectory?: DirectoryData
  currentBranch?: BranchData
}

const HeaderLeft: React.FC<Props> = ({ history, pageType, currentDirectory, currentBranch }) => {
  return (
    <Fragment>
      <BasicButton className="title" onClick={() => history.push('/mypage')}>
        {pageType === 'edit' ? <img src={imgUrl} /> : 'Elaborate'}
      </BasicButton>
      {pageType === 'edit' && (
        <TopicPath
          directoryName={(currentDirectory as DirectoryData).name as string}
          branchName={(currentBranch as BranchData).name as string}
        />
      )}
    </Fragment>
  )
}

export default HeaderLeft

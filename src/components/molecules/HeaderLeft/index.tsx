import React, { Fragment } from 'react'
import * as H from 'history'
import HeaderTitleButton from '../../atoms/Buttons/HeaderTitleButton'
import TopicPath from '../../atoms/TopicPath'
import { BranchData } from '../../../actions/branches'
import { DirectoryData } from '../../../actions/directories'

interface Props {
  history: H.History
  pageType: 'landing' | 'myPage' | 'edit' | 'diff'
  currentDirectory?: DirectoryData
  currentBranch?: BranchData
}

const HeaderLeft: React.FC<Props> = ({ history, pageType, currentDirectory, currentBranch }) => {
  return (
    <Fragment>
      <HeaderTitleButton history={history} pageType={pageType} />
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

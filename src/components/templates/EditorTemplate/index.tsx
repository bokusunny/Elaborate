import React, { Fragment } from 'react'
import * as H from 'history'
import Header from '../../organisms/Header'
import MarkdownEditor from '../../organisms/MarkdownEditor'
import { DirectoryData } from '../../../actions/directories'
import { BranchData } from '../../../actions/branches'

interface Props {
  currentUser: firebase.User
  currentDirectory: DirectoryData
  currentBranch: BranchData
  history: H.History
}

const EditorTemplate: React.FC<Props> = ({
  currentUser,
  currentDirectory,
  currentBranch,
  history,
}) => (
  <Fragment>
    <Header
      colorType="whiteBase"
      pageType="edit"
      currentBranch={currentBranch}
      currentDirectory={currentDirectory}
      history={history}
    />
    <MarkdownEditor
      currentUser={currentUser}
      directoryId={currentDirectory.id as string}
      branchId={currentBranch.id as string}
      branchName={currentBranch.name as string}
      baseBranchId={currentBranch.baseBranchId as string}
      branchType={currentBranch.type as 'master' | 'normal'}
      body={currentBranch.body as string}
      history={history}
    />
  </Fragment>
)

export default EditorTemplate

import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import * as H from 'history'
import CircleProgress from '../../atoms/CircleProgress'
import { fetchCurrentDirectory, DirectoryData } from '../../../actions/directories'
import { fetchCurrentBranch, BranchData } from '../../../actions/branches'
import { ReduxAPIStruct } from '../../../common/static-types/api-struct'
import EditorTemplate from '../../templates/EditorTemplate'

interface MatchParams {
  directoryId: string
  branchId: string
}

interface Props extends RouteComponentProps<MatchParams> {
  currentUser: firebase.User
  children: never
  history: H.History
}

interface StateProps {
  currentDirectory: ReduxAPIStruct<DirectoryData>
  currentBranch: ReduxAPIStruct<BranchData>
}

interface DispatchProps {
  fetchCurrentDirectory: (currentUserUid: string, directoryId: string) => void
  fetchCurrentBranch: (currentUserUid: string, directoryId: string, branchId: string) => void
}

const EditorPage: React.FC<Props & StateProps & DispatchProps> = ({
  currentUser,
  match,
  history,
  currentDirectory,
  fetchCurrentDirectory,
  currentBranch,
  fetchCurrentBranch,
}) => {
  if (!currentUser) return <CircleProgress />

  const {
    params: { directoryId, branchId },
  } = match

  useEffect(() => {
    if (currentDirectory.status === 'default') {
      fetchCurrentDirectory(currentUser.uid, directoryId)
    }
    if (currentBranch.status === 'default') {
      fetchCurrentBranch(currentUser.uid, directoryId, branchId)
    }
  }, [])

  if (
    currentDirectory.status === 'default' ||
    currentDirectory.status === 'fetching' ||
    currentBranch.status === 'default' ||
    currentBranch.status === 'fetching'
  ) {
    return <CircleProgress />
  }

  // ReduxAPIStructの構造的にcurrentBranch.dataはnullになり得ない
  const { isValidBranch } = currentBranch.data as BranchData
  const { isValidDirectoryId } = currentDirectory.data as DirectoryData

  if (!isValidDirectoryId || !isValidBranch) return <h2>404 Not Found</h2>

  return (
    <EditorTemplate
      currentUser={currentUser}
      currentDirectory={currentDirectory.data as DirectoryData}
      currentBranch={currentBranch.data as BranchData}
      history={history}
    />
  )
}

export default connect(
  ({ currentDirectory, currentBranch }: StateProps) => ({
    currentDirectory,
    currentBranch,
  }),
  { fetchCurrentDirectory, fetchCurrentBranch }
)(EditorPage)

import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import * as H from 'history'
import CircularProgress from '@material-ui/core/CircularProgress'
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
  if (!currentUser) return <CircularProgress />

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
    return <CircularProgress />
  }

  // ReduxAPIStructの構造的にcurrentBranch.dataはnullになり得ない
  const { type, isValidBranch, body, name: branchName } = currentBranch.data as BranchData
  const { isValidDirectoryId, name: directoryName } = currentDirectory.data as DirectoryData

  if (!isValidDirectoryId || !isValidBranch) return <h2>404 Not Found</h2>

  return (
    <EditorTemplate
      currentUser={currentUser}
      directoryId={directoryId}
      directoryName={directoryName as string}
      branchId={branchId}
      branchName={branchName as string}
      branchType={type as 'master' | 'normal'} // ReduxAPIStructの構造的にここはundefinedになり得ない
      body={body as string}
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

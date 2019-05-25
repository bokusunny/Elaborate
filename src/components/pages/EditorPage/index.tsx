import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import * as H from 'history'
import CircularProgress from '@material-ui/core/CircularProgress'
import { checkDirectoryId } from '../../../actions/directories'
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
  isValidDirectory: ReduxAPIStruct<boolean>
  currentBranch: ReduxAPIStruct<BranchData>
}

interface DispatchProps {
  checkDirectoryId: (currentUserUid: string, directoryId: string) => void
  fetchCurrentBranch: (currentUserUid: string, directoryId: string, branchId: string) => void
}

const EditorPage: React.FC<Props & StateProps & DispatchProps> = ({
  currentUser,
  match,
  history,
  isValidDirectory,
  checkDirectoryId,
  currentBranch,
  fetchCurrentBranch,
}) => {
  if (!currentUser) return <CircularProgress />

  const {
    params: { directoryId, branchId },
  } = match

  useEffect(() => {
    if (isValidDirectory.status === 'default') {
      checkDirectoryId(currentUser.uid, directoryId)
    }
    if (currentBranch.status === 'default') {
      fetchCurrentBranch(currentUser.uid, directoryId, branchId)
    }
  }, [])

  if (
    isValidDirectory.status === 'default' ||
    isValidDirectory.status === 'fetching' ||
    currentBranch.status === 'default' ||
    currentBranch.status === 'fetching'
  ) {
    return <CircularProgress />
  }

  // ReduxAPIStructの構造的にcurrentBranch.dataはnullになり得ない
  const { type, isValidBranch, body } = currentBranch.data as BranchData

  if (!isValidDirectory.data || !isValidBranch) return <h2>404 Not Found</h2>

  return (
    <EditorTemplate
      currentUser={currentUser}
      directoryId={directoryId}
      branchId={branchId}
      branchType={type as 'master' | 'normal'} // ReduxAPIStructの構造的にここはundefinedになり得ない
      body={body as string}
      history={history}
    />
  )
}

export default connect(
  ({ isValidDirectory, currentBranch }: StateProps) => ({
    isValidDirectory,
    currentBranch,
  }),
  { checkDirectoryId, fetchCurrentBranch }
)(EditorPage)

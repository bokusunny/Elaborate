import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import * as H from 'history'
import CircularProgress from '@material-ui/core/CircularProgress'
import { checkDirectoryId } from '../../../actions/directories'
import { checkBranchId } from '../../../actions/branches'
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
  isValidBranch: ReduxAPIStruct<boolean>
}

interface DispatchProps {
  checkDirectoryId: (currentUserUid: string, directoryId: string) => void
  checkBranchId: (currentUserUid: string, directoryId: string, branchId: string) => void
}

const EditorPage: React.FC<Props & StateProps & DispatchProps> = ({
  currentUser,
  match,
  history,
  isValidDirectory,
  checkDirectoryId,
  isValidBranch,
  checkBranchId,
}) => {
  if (!currentUser) return <CircularProgress />

  const {
    params: { directoryId, branchId },
  } = match

  useEffect(() => {
    if (isValidDirectory.status === 'default') {
      checkDirectoryId(currentUser.uid, directoryId)
    }
    if (isValidBranch.status === 'default') {
      checkBranchId(currentUser.uid, directoryId, branchId)
    }
  }, [])

  if (
    isValidDirectory.status === 'default' ||
    isValidDirectory.status === 'fetching' ||
    isValidBranch.status === 'default' ||
    isValidBranch.status === 'fetching'
  ) {
    return <CircularProgress />
  }

  if (!isValidDirectory.data || !isValidBranch.data) return <h2>404 Not Found</h2>

  return (
    <EditorTemplate
      currentUser={currentUser}
      directoryId={directoryId}
      branchId={branchId}
      history={history}
    />
  )
}

export default connect(
  ({ isValidDirectory, isValidBranch }: StateProps) => ({ isValidDirectory, isValidBranch }),
  { checkDirectoryId, checkBranchId }
)(EditorPage)

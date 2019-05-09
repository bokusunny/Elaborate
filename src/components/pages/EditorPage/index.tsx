import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import * as H from 'history'
import CircularProgress from '@material-ui/core/CircularProgress'
import { checkDirectoryId } from '../../../actions/directories'
import { checkCurrentBranchData, BranchData } from '../../../actions/branches'
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
  currentBranchData: ReduxAPIStruct<BranchData>
}

interface DispatchProps {
  checkDirectoryId: (currentUserUid: string, directoryId: string) => void
  checkCurrentBranchData: (currentUserUid: string, directoryId: string, branchId: string) => void
}

const EditorPage: React.FC<Props & StateProps & DispatchProps> = ({
  currentUser,
  match,
  history,
  isValidDirectory,
  checkDirectoryId,
  currentBranchData,
  checkCurrentBranchData,
}) => {
  if (!currentUser) return <CircularProgress />

  const {
    params: { directoryId, branchId },
  } = match

  useEffect(() => {
    if (isValidDirectory.status === 'default') {
      checkDirectoryId(currentUser.uid, directoryId)
    }
    if (currentBranchData.status === 'default') {
      checkCurrentBranchData(currentUser.uid, directoryId, branchId)
    }
  }, [])

  if (
    isValidDirectory.status === 'default' ||
    isValidDirectory.status === 'fetching' ||
    currentBranchData.status === 'default' ||
    currentBranchData.status === 'fetching'
  ) {
    return <CircularProgress />
  }

  // 理論上ここはtrueになり得ない
  if (isValidDirectory.data === null || currentBranchData.data === null) {
    return <h2>An unexpected error occured...</h2>
  }

  if (!isValidDirectory.data || !currentBranchData.data.isValidBranch) {
    return <h2>404 Not Found</h2>
  }

  return (
    <EditorTemplate
      currentUser={currentUser}
      directoryId={directoryId}
      branchId={branchId}
      branchType={currentBranchData.data.type}
      history={history}
    />
  )
}

export default connect(
  ({ isValidDirectory, currentBranchData }: StateProps) => ({
    isValidDirectory,
    currentBranchData,
  }),
  { checkDirectoryId, checkCurrentBranchData }
)(EditorPage)

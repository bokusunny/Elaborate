import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as H from 'history'
import { RouteComponentProps } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import { ReduxAPIStruct } from '../../../common/static-types/api-struct'
import { fetchLeftFile, fetchRightFile } from '../../../actions/diff'
import DiffTemplate from '../../templates/DiffTemplate/index'
import { LeftFile, RightFile } from '../../../reducers/diff'

interface MatchParams {
  directoryId: string
  leftBranchId: string
  rightBranchId: string
}

interface Props extends RouteComponentProps<MatchParams> {
  currentUser: firebase.User
  history: H.History
}

interface DispatchProps {
  fetchLeftFile: (currentUserId: string, directoryId: string, branchId: string) => void
  fetchRightFile: (currentUserId: string, directoryId: string, branchId: string) => void
}

interface StateProps {
  diffLeftFile: ReduxAPIStruct<LeftFile>
  diffRightFile: ReduxAPIStruct<RightFile>
  selectedDirectoryId: string | null
  selectedBranchId: string | null
}

const DiffPage: React.FC<Props & DispatchProps & StateProps> = ({
  currentUser,
  fetchLeftFile,
  fetchRightFile,
  diffLeftFile,
  diffRightFile,
  history,
  match,
}) => {
  if (!currentUser) return <CircularProgress />

  const {
    params: { directoryId, leftBranchId, rightBranchId },
  } = match

  useEffect(() => {
    fetchLeftFile(currentUser.uid, directoryId, leftBranchId)
    fetchRightFile(currentUser.uid, directoryId, rightBranchId)
  }, [])

  if (diffLeftFile.data === null || diffRightFile.data === null) return <div>Loading...</div>

  if (
    diffLeftFile.data.leftFileBody === null ||
    diffLeftFile.data.leftFileName === null ||
    diffRightFile.data.rightFileBody === null ||
    diffRightFile.data.rightFileName === null
  )
    return <div>Loading...</div>

  return (
    <DiffTemplate
      history={history}
      diffLeftFileBody={diffLeftFile.data.leftFileBody}
      diffLeftFileName={diffLeftFile.data.leftFileName}
      diffRightFileBody={diffRightFile.data.rightFileBody}
      diffRightFileName={diffRightFile.data.rightFileName}
      currentUserUid={currentUser.uid}
      directoryId={directoryId}
      branchId={rightBranchId}
    />
  )
}

export default connect(
  ({ diffLeftFile, diffRightFile, selectedDirectoryId, selectedBranchId }: StateProps) => ({
    diffLeftFile,
    diffRightFile,
    selectedDirectoryId,
    selectedBranchId,
  }),
  { fetchLeftFile, fetchRightFile }
)(DiffPage)

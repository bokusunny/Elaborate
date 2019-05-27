import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as H from 'history'
import { RouteComponentProps } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import { ReduxAPIStruct } from '../../../common/static-types/api-struct'
import { fetchLeftFile, fetchRightFile } from '../../../actions/diff'
import DiffTemplate from '../../templates/DiffTemplate/index'
import { LeftFile, RightFile } from '../../../actions/diff'

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

  if (diffLeftFile.status === 'failure') return <div>{diffLeftFile.error.message}</div>

  if (diffRightFile.status === 'failure') return <div>{diffRightFile.error.message}</div>

  if (
    diffLeftFile.status === 'default' ||
    diffRightFile.status === 'default' ||
    diffLeftFile.status === 'fetching' ||
    diffRightFile.status === 'fetching'
  )
    return <div>Loading...</div>

  return (
    <DiffTemplate
      history={history}
      diffLeftFileBody={(diffLeftFile.data as LeftFile).leftFileBody as string}
      diffLeftFileName={(diffLeftFile.data as LeftFile).leftFileName as string}
      diffRightFileBody={(diffRightFile.data as RightFile).rightFileBody as string}
      diffRightFileName={(diffRightFile.data as RightFile).rightFileName as string}
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

import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as H from 'history'
import { RouteComponentProps } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import { ReduxAPIStruct } from '../../../common/static-types/api-struct'
import { fetchLeftFile, fetchRightFile } from '../../../actions/diff'
import DiffTemplate from '../../templates/DiffTemplate'

interface MatchParams {
  directoryId: string
  rightBranchId: string
}

interface Props extends RouteComponentProps<MatchParams> {
  currentUser: firebase.User
  history: H.History
}

interface DispatchProps {
  fetchLeftFile: (currentUserId: string, directoryId: string) => void
  fetchRightFile: (currentUserId: string, directoryId: string, branchId: string) => void
}

interface StateProps {
  diffLeftFile: ReduxAPIStruct<string>
  diffRightFile: ReduxAPIStruct<string>
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
    params: { directoryId, rightBranchId },
  } = match

  useEffect(() => {
    fetchLeftFile(currentUser.uid, directoryId)
    fetchRightFile(currentUser.uid, directoryId, rightBranchId)
  }, [])

  if (diffLeftFile.data === null || diffRightFile.data === null) return <div>Loading...</div>

  return (
    <DiffTemplate
      history={history}
      diffLeftFileBody={diffLeftFile.data}
      diffRightFileBody={diffRightFile.data}
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

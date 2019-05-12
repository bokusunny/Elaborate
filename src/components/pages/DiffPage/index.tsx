import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as H from 'history'
import { RouteComponentProps } from 'react-router-dom'
import { ReduxAPIStruct } from '../../../common/static-types/api-struct'
import { fetchLeftFile, fetchRightFile } from '../../../actions/diff'
import DiffTemplate from '../../templates/DiffTemplate'

interface Props extends RouteComponentProps {
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
  selectedDirectoryId,
  selectedBranchId,
  history,
}) => {
  // TODO: リロードしたらここはtrueになるが想定内、URLからIDをfetchするように変える
  if (selectedDirectoryId === null || selectedBranchId === null)
    return <div>Ooops some unknown error happened</div>

  if (diffLeftFile.data === null || diffRightFile.data === null) return <div>Loading...</div>

  // TODO: リロードに対応する
  useEffect(() => {
    fetchLeftFile(currentUser.uid, selectedDirectoryId)
    fetchRightFile(currentUser.uid, selectedDirectoryId, selectedBranchId)
  }, [])

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

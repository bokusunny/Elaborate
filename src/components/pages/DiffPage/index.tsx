import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as H from 'history'
import { RouteComponentProps } from 'react-router-dom'
import { fetchLeftFile, fetchRightFile } from '../../../actions/diff'
import DiffTemplate from '../../templates/DiffTemplate'

interface Props extends RouteComponentProps {
  currentUser: firebase.User
  history: H.History
}

interface StateProps {
  fetchLeftFile: (currentUserId: string, directoryId: string) => void
  fetchRightFile: (currentUserId: string, directoryId: string, branchId: string) => void
  diffLeftFile: string
  diffRightFile: string
  selectedDirectoryId: string | null
  selectedBranchId: string | null
}

const DiffPage: React.FC<Props & StateProps> = ({
  currentUser,
  fetchLeftFile,
  fetchRightFile,
  diffLeftFile,
  diffRightFile,
  selectedDirectoryId,
  selectedBranchId,
  history,
}) => {
  if (selectedDirectoryId === null || selectedBranchId === null) return <div>Loading ...</div>

  useEffect(() => {
    fetchLeftFile(currentUser.uid, selectedDirectoryId)
    fetchRightFile(currentUser.uid, selectedDirectoryId, selectedBranchId)
  }, [])

  return (
    <DiffTemplate history={history} diffLeftFile={diffLeftFile} diffRightFile={diffRightFile} />
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

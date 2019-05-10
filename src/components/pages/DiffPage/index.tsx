import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { fetchDirectories } from '../../../actions/directories'
import { ReduxAPIStruct } from '../../../common/static-types/api-struct'
import { FirebaseSnapShot } from '../../../utils/firebase'
import CircularProgress from '@material-ui/core/CircularProgress'
import DiffTemplate from '../../templates/DiffTemplate'

interface Props extends RouteComponentProps {
  currentUser: firebase.User | null
  fetchDirectories: (currentUserUid: string | null) => void
}

interface StateProps {
  directories: ReduxAPIStruct<FirebaseSnapShot[]>
  selectedDirectoryIdForDiff: string | null
}

const DiffPage: React.FC<Props & StateProps> = ({
  currentUser,
  fetchDirectories,
  directories,
  selectedDirectoryIdForDiff,
  history,
}) => {
  useEffect(() => {
    const currentUserUid = currentUser ? currentUser.uid : null
    fetchDirectories(currentUserUid)
  }, [currentUser])

  if (!currentUser) return <CircularProgress />

  return (
    <DiffTemplate
      directories={directories}
      selectedDirectoryIdForDiff={selectedDirectoryIdForDiff}
      currentUser={currentUser}
      history={history}
    />
  )
}

export default connect(
  ({ directories, selectedDirectoryIdForDiff }: StateProps) => ({
    directories,
    selectedDirectoryIdForDiff,
  }),
  { fetchDirectories }
)(DiffPage)

import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchDirectories } from '../../../actions/directories'
import { ReduxAPIStruct } from '../../../reducers/static-types'
import { FirebaseSnapShot } from '../../../utils/firebase'
import CircularProgress from '@material-ui/core/CircularProgress'
import MyPageTemplate from '../../templates/MyPageTemplate'
import { DirectoriesStatus } from '../../../reducers/directories'

interface Props {
  currentUser: firebase.User | null
  fetchDirectories: (currentUserUid: string | null) => void
}

interface StateProps {
  directories: ReduxAPIStruct<FirebaseSnapShot[]>
  branches: ReduxAPIStruct<FirebaseSnapShot[]>
  directoriesStatus: DirectoriesStatus
}

const MyPage: React.FC<Props & StateProps> = ({
  currentUser,
  fetchDirectories,
  directories,
  branches,
  directoriesStatus,
}) => {
  useEffect(() => {
    const currentUserUid = currentUser ? currentUser.uid : null
    fetchDirectories(currentUserUid)
  }, [currentUser])

  const { selectedDirectoryId } = directoriesStatus

  if (!currentUser) return <CircularProgress />

  return (
    <MyPageTemplate
      directories={directories}
      branches={branches}
      currentUser={currentUser}
      selectedDirectoryId={selectedDirectoryId}
    />
  )
}

export default connect(
  ({ directories, branches, directoriesStatus }: StateProps) => ({
    directories,
    directoriesStatus,
    branches,
  }),
  { fetchDirectories }
)(MyPage)

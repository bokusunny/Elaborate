import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchDirectories } from '../../../actions/directories'
import { ReduxAPIStruct } from '../../../common/static-types/api-struct'
import { FirebaseSnapShot } from '../../../utils/firebase'
import CircularProgress from '@material-ui/core/CircularProgress'
import MyPageTemplate from '../../templates/MyPageTemplate'

interface Props {
  currentUser: firebase.User | null
  fetchDirectories: (currentUserUid: string | null) => void
}

interface StateProps {
  directories: ReduxAPIStruct<FirebaseSnapShot[]>
  branches: ReduxAPIStruct<FirebaseSnapShot[]>
  selectedDirectoryId: string | null
}

const MyPage: React.FC<Props & StateProps> = ({
  currentUser,
  fetchDirectories,
  directories,
  branches,
  selectedDirectoryId,
}) => {
  useEffect(() => {
    const currentUserUid = currentUser ? currentUser.uid : null
    fetchDirectories(currentUserUid)
  }, [currentUser])

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
  ({ directories, branches, selectedDirectoryId }: StateProps) => ({
    directories,
    selectedDirectoryId,
    branches,
  }),
  { fetchDirectories }
)(MyPage)

import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchDirectories } from '../../../actions/directories'
import { ReduxAPIStruct } from '../../../reducers/static-types'
import { FirebaseSnapShot } from '../../../utils/firebase'
import CircularProgress from '@material-ui/core/CircularProgress'
import MyPageTemplate from '../../templates/MyPageTemplate'

interface Props {
  currentUser: firebase.User | null
  fetchDirectories: (currentUserUid: string | null) => void
  directories: ReduxAPIStruct<FirebaseSnapShot[]>
}

const MyPage: React.FC<Props> = ({ currentUser, fetchDirectories, directories }) => {
  useEffect(() => {
    const currentUserUid = currentUser ? currentUser.uid : null
    fetchDirectories(currentUserUid)
  }, [currentUser])

  if (!currentUser) return <CircularProgress />

  return <MyPageTemplate directories={directories} currentUser={currentUser} />
}

export default connect(
  ({ directories }: Record<string, ReduxAPIStruct<FirebaseSnapShot[]>>) => ({
    directories,
  }),
  { fetchDirectories }
)(MyPage)

import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchDirectories } from '../../../actions/directories'
import { ReduxAPIStruct } from '../../../reducers/static-types'
import { FirebaseSnapShot } from '../../../utils/firebase'
import MyPageTemplate from '../../templates/MyPageTemplate'

interface Props {
  fetchDirectories: () => void
  directories: ReduxAPIStruct<FirebaseSnapShot[]>
}

const MyPage: React.FC<Props> = ({ fetchDirectories, directories }) => {
  useEffect(() => fetchDirectories(), [])

  return <MyPageTemplate directories={directories} />
}

export default connect(
  ({ directories }: Record<string, ReduxAPIStruct<FirebaseSnapShot[]>>) => ({
    directories,
  }),
  { fetchDirectories }
)(MyPage)

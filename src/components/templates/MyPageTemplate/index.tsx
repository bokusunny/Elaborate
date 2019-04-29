import React from 'react'
import { auth, FirebaseSnapShot } from '../../../utils/firebase'
import Typography from '@material-ui/core/Typography'
import DirectoryList from '../../molecules/DirectoryList'
import * as styles from './style.css'
import { ReduxAPIStruct } from '../../../reducers/static-types'

interface Props {
  directories: ReduxAPIStruct<FirebaseSnapShot[]>
}

const onClickSignOut = () => {
  auth.signOut()
}

const MyPageTemplate: React.FC<Props> = ({ directories }) => (
  <div className={styles.background}>
    <div className={styles.container}>
      <Typography variant="h6">Click your directories to update documents.</Typography>
      <DirectoryList directories={directories} />
      <button onClick={onClickSignOut}>Sign out</button>
    </div>
  </div>
)

export default MyPageTemplate

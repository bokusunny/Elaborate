import React from 'react'
import { auth } from '../../../utils/firebase'
import Typography from '@material-ui/core/Typography'
import DirectoryList from '../../molecules/DirectoryList'
import * as styles from './style.css'

interface Props {
  directoryNameArray: string[]
}

const onClickSignOut = () => {
  auth.signOut()
}

const MyPageTemplate: React.FC<Props> = props => (
  <div className={styles.background}>
    <div className={styles.container}>
      <Typography variant="h6">Click your directories to update documents.</Typography>
      <DirectoryList {...props} />
      <button onClick={onClickSignOut}>Sign out</button>
    </div>
  </div>
)

export default MyPageTemplate

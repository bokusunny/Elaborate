import React from 'react'
import { FirebaseSnapShot } from '../../../utils/firebase'
import DirectoryList from '../../molecules/Lists/DirectoryList'
import BranchList from '../../molecules/Lists/BranchList'
import { ReduxAPIStruct } from '../../../reducers/static-types'
import * as styles from './style.css'

interface Props {
  directories: ReduxAPIStruct<FirebaseSnapShot[]>
  branches: ReduxAPIStruct<FirebaseSnapShot[]>
  currentUser: firebase.User
}

const MyPageList: React.FC<Props> = ({ directories, branches, currentUser }) => {
  return (
    <div className={styles.container}>
      <div className={styles.directoryList}>
        <h2>Directories</h2>
        <DirectoryList directories={directories} currentUser={currentUser} />
      </div>
      <div className={styles.branchList}>
        <h2>Branches</h2>
        <BranchList branches={branches} />
      </div>
    </div>
  )
}
export default MyPageList

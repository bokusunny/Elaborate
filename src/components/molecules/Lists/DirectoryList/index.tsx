import React from 'react'
import { connect } from 'react-redux'
import { fetchBranches } from '../../../../actions/branches'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import DirectoryListItem from '../../../atoms/ListItems/DirectoryListItem'
import * as styles from './style.css'
import { FirebaseSnapShot } from '../../../../utils/firebase'
import { ReduxAPIStruct } from '../../../../reducers/static-types'

interface Props {
  directories: ReduxAPIStruct<FirebaseSnapShot[]>
  currentUser: firebase.User
  fetchBranches: (currentUserUid: string, directoryId: string) => void
}

const DirectoryList: React.FC<Props> = ({ directories, currentUser, fetchBranches }) => {
  if (directories.status === 'fetching' || directories.data === null) {
    return <div>Loading...</div>
  }

  if (directories.status === 'failure') {
    return <div>Error occured: {directories.error.message}</div>
  }

  const currentUserUid = currentUser.uid

  return (
    <div className={styles.container}>
      <List component="nav">
        <Divider />
        {directories.data.map((doc: FirebaseSnapShot) => {
          const { id } = doc
          const { name } = doc.data()
          return (
            <div key={id}>
              <DirectoryListItem label={name} onClick={() => fetchBranches(currentUserUid, id)} />
              <Divider />
            </div>
          )
        })}
      </List>
    </div>
  )
}

export default connect(
  null,
  { fetchBranches }
)(DirectoryList)

import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { fetchBranches } from '../../../../actions/branches'
import { setSelectedDirectory } from '../../../../actions/directories'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import DirectoryListItem from '../../../atoms/ListItems/DirectoryListItem'
import * as styles from './style.css'
import { FirebaseSnapShot } from '../../../../utils/firebase'
import { ReduxAPIStruct } from '../../../../common/static-types/api-struct'

interface Props {
  directories: ReduxAPIStruct<FirebaseSnapShot[]>
  currentUser: firebase.User
  fetchBranches: (currentUserUid: string, directoryId: string) => void
  setSelectedDirectory: (selectedDirectoryId: string) => void
}

const DirectoryList: React.FC<Props> = ({
  directories,
  currentUser,
  fetchBranches,
  setSelectedDirectory,
}) => {
  if (directories.status === 'fetching' || directories.data === null) {
    return <div>Loading...</div>
  }

  if (directories.status === 'failure') {
    return <div>Error occured: {directories.error.message}</div>
  }

  const handleOnClick = (currentUserId: string, directoryId: string) => {
    fetchBranches(currentUserId, directoryId)
    setSelectedDirectory(directoryId)
  }

  return (
    <div className={styles.container}>
      <List component="nav">
        <Divider />
        {directories.data.map((doc: FirebaseSnapShot) => {
          const { id } = doc
          const { name } = doc.data()
          return (
            <Fragment key={id}>
              <DirectoryListItem label={name} onClick={() => handleOnClick(currentUser.uid, id)} />
              <Divider />
            </Fragment>
          )
        })}
      </List>
    </div>
  )
}

export default connect(
  null,
  { fetchBranches, setSelectedDirectory }
)(DirectoryList)

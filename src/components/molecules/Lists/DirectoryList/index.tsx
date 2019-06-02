import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { fetchBranches } from '../../../../actions/branches'
import { setSelectedDirectory } from '../../../../actions/directories'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import DirectoryListItem from '../../../atoms/ListItems/DirectoryListItem'
import DirectoryFormWithAddIcon from '../../FormWithButton/DirectoryFormWithAddIcon'
import * as styles from './style.css'
const { container, message } = styles
import { FirebaseSnapShot } from '../../../../utils/firebase'
import { ReduxAPIStruct } from '../../../../common/static-types/api-struct'
import { DirectoryDocumentData } from '../../../../common/static-types/document-data'

interface Props {
  directories: ReduxAPIStruct<FirebaseSnapShot[]>
  currentUser: firebase.User
  selectedDirectoryId: string | null
  fetchBranches: (currentUserUid: string, directoryId: string) => void
  setSelectedDirectory: (selectedDirectoryId: string) => void
}

const DirectoryList: React.FC<Props> = ({
  directories,
  currentUser,
  selectedDirectoryId,
  fetchBranches,
  setSelectedDirectory,
}) => {
  if (directories.status === 'default' || directories.status === 'fetching') {
    return <div className={message}>Loading...</div>
  }

  if (directories.status === 'failure') {
    return <div className={message}>Error occured: {directories.error.message}</div>
  }

  const handleOnClick = (currentUserId: string, directoryId: string) => {
    fetchBranches(currentUserId, directoryId)
    setSelectedDirectory(directoryId)
  }

  const directoryItemList = () => {
    return (directories.data as FirebaseSnapShot[]).map(doc => {
      const { id } = doc
      const { name, createdAt } = doc.data() as DirectoryDocumentData

      return (
        <Fragment key={id}>
          <DirectoryListItem
            label={name}
            createdAt={createdAt}
            onClick={() => handleOnClick(currentUser.uid, id)}
            directoryId={id}
            selectedDirectoryId={selectedDirectoryId}
          />
          <Divider />
        </Fragment>
      )
    })
  }

  const isEmptyBranches = (directories.data as FirebaseSnapShot[]).length === 0

  return (
    <div className={container}>
      <List component="nav">
        <Divider />
        {isEmptyBranches ? (
          <div className={message}>Click the + button bellow to create your first directory!</div>
        ) : (
          directoryItemList()
        )}
      </List>
      <DirectoryFormWithAddIcon currentUser={currentUser} />
    </div>
  )
}

export default connect(
  null,
  { fetchBranches, setSelectedDirectory }
)(DirectoryList)

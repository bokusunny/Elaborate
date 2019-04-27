import React, { Fragment } from 'react'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import DirectoryListItem from '../../atoms/ListItems/DirectoryListItem'
import * as styles from './style.css'
import { firebase } from '../../../utils/firebase'

interface Props {
  directories: Record<string, any>
}

const DirectoryList: React.FC<Props> = ({ directories }) => {
  if (directories.status !== 'success') return <div>Loading...</div>

  return (
    <div className={styles.container}>
      <List component="nav">
        <Divider />
        {directories.data.map((doc: firebase.firestore.QueryDocumentSnapshot) => {
          const dirName = doc.data().name
          return (
            <Fragment key={dirName}>
              <DirectoryListItem label={dirName} />
              <Divider />
            </Fragment>
          )
        })}
      </List>
    </div>
  )
}

export default DirectoryList

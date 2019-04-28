import React, { Fragment } from 'react'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import DirectoryListItem from '../../atoms/ListItems/DirectoryListItem'
import * as styles from './style.css'
import { FirebaseSnapShot } from '../../../utils/firebase'
import { ReduxAPIStruct } from '../../../reducers/static-types'

interface Props {
  directories: ReduxAPIStruct<FirebaseSnapShot[]>
}

const DirectoryList: React.FC<Props> = ({ directories }) => {
  if (directories.status === 'fetching' || directories.data === null) {
    return <div>Loading...</div>
  }

  if (directories.status === 'failure') {
    return <div>Error occured: {directories.error}</div>
  }

  return (
    <div className={styles.container}>
      <List component="nav">
        <Divider />
        {directories.data.map((doc: FirebaseSnapShot) => {
          const { name, createdAt } = doc.data()
          return (
            <Fragment key={createdAt}>
              <DirectoryListItem label={name} />
              <Divider />
            </Fragment>
          )
        })}
      </List>
    </div>
  )
}

export default DirectoryList

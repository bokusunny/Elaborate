import React, { Fragment } from 'react'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import DirectoryListItem from '../../atoms/ListItems/DirectoryListItem'
import * as styles from './style.css'

interface Props {
  directoryNameArray: string[]
}

const DirectoryList: React.FC<Props> = ({ directoryNameArray }) => (
  <div className={styles.container}>
    <List component="nav">
      <Divider />
      {directoryNameArray.map(dirname => (
        <Fragment key={dirname}>
          <DirectoryListItem label={dirname} />
          <Divider />
        </Fragment>
      ))}
    </List>
  </div>
)

export default DirectoryList

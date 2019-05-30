import React from 'react'
import moment from 'moment'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons'
import * as styles from './style.css'
const { listItemText, listItemSubText } = styles

interface Props {
  directoryId: string
  currentBranchId: string
  branchName: string
  updatedAt: number
}

const BranchListItem: React.FC<Props> = ({
  branchName,
  directoryId,
  currentBranchId,
  updatedAt,
}) => {
  const daysFromLastUpdate = moment.unix(updatedAt / 1000).from()
  return (
    <ListItem
      button
      component="a"
      href={`${directoryId}/${currentBranchId}/edit`}
      className={styles.listItem}
    >
      <ListItemIcon>
        <FontAwesomeIcon icon={faCodeBranch} />
      </ListItemIcon>
      <div>
        <div className={listItemText}>{branchName}</div>
        <div className={listItemSubText}>Updated {daysFromLastUpdate}</div>
      </div>
    </ListItem>
  )
}

export default BranchListItem

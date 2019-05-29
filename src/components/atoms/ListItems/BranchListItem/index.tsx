import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons'
import * as styles from './style.css'

interface Props {
  directoryId: string
  currentBranchId: string
  branchName: string
}

const BranchListItem: React.FC<Props> = ({ branchName, directoryId, currentBranchId }) => (
  <ListItem
    button
    component="a"
    href={`${directoryId}/${currentBranchId}/edit`}
    className={styles.listItem}
  >
    <ListItemIcon>
      <FontAwesomeIcon icon={faCodeBranch} />
    </ListItemIcon>
    <div className={styles.listItemText}>{branchName}</div>
  </ListItem>
)

export default BranchListItem

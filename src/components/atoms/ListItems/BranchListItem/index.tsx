import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons'

interface Props {
  directoryId: string
  currentBranchId: string
  branchName: string
}

const BranchListItem: React.FC<Props> = ({ branchName, directoryId, currentBranchId }) => (
  <ListItem button component="a" href={`${directoryId}/${currentBranchId}/edit`}>
    <ListItemIcon>
      <FontAwesomeIcon icon={faCodeBranch} />
    </ListItemIcon>
    <ListItemText primary={branchName} />
  </ListItem>
)

export default BranchListItem

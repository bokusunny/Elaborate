import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons'

interface Props {
  directoryId: string
  branchId: string
  branchName: string
}

const BranchListItem: React.FC<Props> = ({ branchName, directoryId, branchId }) => (
  <ListItem button component="a" href={`${directoryId}/${branchId}/edit`}>
    <ListItemIcon>
      <FontAwesomeIcon icon={faCodeBranch} />
    </ListItemIcon>
    <ListItemText primary={branchName} />
    {branchName !== 'master' && <button>merge to master</button>}
  </ListItem>
)

export default BranchListItem

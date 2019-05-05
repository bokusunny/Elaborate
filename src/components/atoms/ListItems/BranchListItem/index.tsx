import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons'

interface Props {
  label: string
}

const BranchListItem: React.FC<Props> = ({ label }) => (
  <ListItem>
    <ListItemIcon>
      <FontAwesomeIcon icon={faCodeBranch} />
    </ListItemIcon>
    <ListItemText primary={label} />
  </ListItem>
)

export default BranchListItem

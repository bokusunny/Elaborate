import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'

interface Props {
  label: string
  onClick: () => void
}

const DirectoryListItem: React.FC<Props> = ({ label, onClick }) => (
  <ListItem button onClick={onClick}>
    <ListItemIcon>
      <FontAwesomeIcon icon={faFolderOpen} />
    </ListItemIcon>
    <ListItemText primary={label} />
  </ListItem>
)

export default DirectoryListItem

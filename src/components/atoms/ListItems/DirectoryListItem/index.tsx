import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'

interface Props {
  id: string
  label: string
}

const iconFolder = <FontAwesomeIcon icon={faFolderOpen} />

const DirectoryListItem: React.FC<Props> = ({ id, label }) => (
  <ListItem button component="a" href={`/${id}`}>
    <ListItemIcon>{iconFolder}</ListItemIcon>
    <ListItemText primary={label} />
  </ListItem>
)

export default DirectoryListItem

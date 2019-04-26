import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DraftsIcon from '@material-ui/icons/Drafts'

interface Props {
  label: string
}

const DirectoryListItem: React.FC<Props> = ({ label }) => (
  <ListItem button>
    <ListItemIcon>
      <DraftsIcon />
    </ListItemIcon>
    <ListItemText primary={label} />
  </ListItem>
)

export default DirectoryListItem

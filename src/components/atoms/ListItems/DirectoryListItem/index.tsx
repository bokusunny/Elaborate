import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import * as styles from './style.css'

interface Props {
  label: string
  onClick: () => void
}

const DirectoryListItem: React.FC<Props> = ({ label, onClick }) => (
  <ListItem button onClick={onClick} className={styles.listItem}>
    <ListItemIcon>
      <FontAwesomeIcon icon={faFolderOpen} />
    </ListItemIcon>
    <div className={styles.listItemText}>{label}</div>
  </ListItem>
)

export default DirectoryListItem

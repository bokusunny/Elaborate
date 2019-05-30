import React from 'react'
import moment from 'moment'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import * as styles from './style.css'
const { listItemText, listItemSubText } = styles

interface Props {
  label: string
  createdAt: number
  onClick: () => void
  isSelected: boolean
}

const DirectoryListItem: React.FC<Props> = ({ label, onClick, createdAt, isSelected }) => {
  const daysFromCreated = moment.unix(createdAt / 1000).from()
  return (
    <ListItem button selected={isSelected} onClick={onClick} className={styles.listItem}>
      <ListItemIcon>
        <FontAwesomeIcon icon={faFolderOpen} />
      </ListItemIcon>
      <div>
        <div className={listItemText}>{label}</div>
        <div className={listItemSubText}>Created {daysFromCreated}</div>
      </div>
    </ListItem>
  )
}

export default DirectoryListItem

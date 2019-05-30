import React from 'react'
import moment from 'moment'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen } from '@fortawesome/free-solid-svg-icons'
import * as styles from './style.css'
const { listItem, selected, unselected, listItemText, listItemSubText } = styles

interface Props {
  label: string
  createdAt: number
  onClick: () => void
  directoryId: string
  selectedDirectoryId: string | null
}

const DirectoryListItem: React.FC<Props> = ({
  label,
  onClick,
  createdAt,
  directoryId,
  selectedDirectoryId,
}) => {
  const daysFromCreated = moment.unix(createdAt / 1000).from()
  const selectedClass = (() => {
    switch (selectedDirectoryId) {
      case directoryId:
        return selected

      case null:
        return ''
    }
    return unselected
  })()

  return (
    <ListItem button onClick={onClick} className={`${listItem} ${selectedClass}`}>
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

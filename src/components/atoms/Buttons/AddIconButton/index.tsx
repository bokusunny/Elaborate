import React from 'react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import * as styles from './style.css'
const { addIcon } = styles

interface Props {
  className?: 'directory' | 'branch'
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const AddIconButton: React.FC<Props> = ({ className: propsClassName, onClick }) => {
  const className = propsClassName ? styles[propsClassName] : ''

  return (
    <Fab aria-label="Add" className={`${addIcon} ${className}`} onClick={onClick}>
      <AddIcon />
    </Fab>
  )
}

export default AddIconButton

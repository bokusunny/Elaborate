import React from 'react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

interface Props {
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const AddIconButton: React.FC<Props> = props => (
  <Fab color="primary" aria-label="Add" {...props}>
    <AddIcon />
  </Fab>
)

export default AddIconButton

import React from 'react'
import Popover from '@material-ui/core/Popover'
import DirectoryForm from '../../Forms/DirectoryForm'

interface Props {
  currentUser: firebase.User
  isOpen: boolean
  anchorElement: EventTarget & HTMLDivElement | null
  handleClose: () => void
}

const DirectoryFormPopover: React.FC<Props> = ({
  currentUser,
  isOpen,
  anchorElement,
  handleClose,
}) => (
  <Popover
    open={isOpen}
    anchorEl={anchorElement}
    onClose={handleClose}
    transformOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
  >
    <DirectoryForm currentUser={currentUser} />
  </Popover>
)

export default DirectoryFormPopover

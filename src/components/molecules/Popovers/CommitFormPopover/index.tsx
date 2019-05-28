import React from 'react'
import Popover from '@material-ui/core/Popover'
import { RawDraftContentBlock } from 'draft-js'
import CommitForm from '../../Forms/CommitForm'

interface Props {
  currentUser: firebase.User
  directoryId: string
  branchId: string
  branchName: string
  rawContentBlocks: RawDraftContentBlock[]
  isOpen: boolean
  anchorElement: EventTarget & HTMLDivElement | null
  handleClose: () => void
}

const CommitFormPopover: React.FC<Props> = ({ isOpen, anchorElement, ...rest }) => (
  <Popover
    open={isOpen}
    anchorEl={anchorElement}
    onClose={rest.handleClose}
    transformOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
  >
    <CommitForm {...rest} />
  </Popover>
)

export default CommitFormPopover

import React from 'react'
import Popover from '@material-ui/core/Popover'
import BranchForm from '../../Forms/BranchForm'
import { ReduxAPIStruct } from '../../../../common/static-types/api-struct'
import { FirebaseSnapShot } from '../../../../utils/firebase'

interface Props {
  currentUser: firebase.User
  directoryId: string
  branches: ReduxAPIStruct<FirebaseSnapShot[]>
  isOpen: boolean
  anchorElement: EventTarget & HTMLDivElement | null
  handleClose: () => void
}

const BranchFormPopover: React.FC<Props> = ({ isOpen, anchorElement, ...rest }) => (
  <Popover
    open={isOpen}
    anchorEl={anchorElement}
    onClose={rest.handleClose}
    transformOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
  >
    <BranchForm {...rest} />
  </Popover>
)

export default BranchFormPopover

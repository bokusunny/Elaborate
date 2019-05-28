import React, { Fragment, useState } from 'react'
import AddIconButton from '../../atoms/Buttons/AddIconButton'
import BranchFormPopOver from '../../molecules/Popovers/BranchFormPopover'
import { ReduxAPIStruct } from '../../../common/static-types/api-struct'
import { FirebaseSnapShot } from '../../../utils/firebase'

interface Props {
  currentUser: firebase.User
  directoryId: string
  branches: ReduxAPIStruct<FirebaseSnapShot[]>
}

const BranchFormWithAddIcon: React.FC<Props> = props => {
  const [isOpen, setIsOpen] = useState(false)
  const [anchorElement, setAnchorElement] = useState<EventTarget & HTMLDivElement | null>(null)

  const handleClickButton = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsOpen(true)
    setAnchorElement(e.currentTarget)
  }

  const handleClose = () => {
    setIsOpen(false)
    setAnchorElement(null)
  }

  return (
    <Fragment>
      <AddIconButton onClick={handleClickButton} />
      <BranchFormPopOver
        {...props}
        isOpen={isOpen}
        anchorElement={anchorElement}
        handleClose={handleClose}
      />
    </Fragment>
  )
}

export default BranchFormWithAddIcon

import React, { Fragment, useState } from 'react'
import AddIconButton from '../../../atoms/Buttons/AddIconButton'
import DirectoryFormPopOver from '../../../molecules/Popovers/DirectoryFormPopover'

interface Props {
  currentUser: firebase.User
}

const DirectoryFormWithAddIcon: React.FC<Props> = props => {
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
      <AddIconButton className="directory" onClick={handleClickButton} />
      <DirectoryFormPopOver
        {...props}
        isOpen={isOpen}
        anchorElement={anchorElement}
        handleClose={handleClose}
      />
    </Fragment>
  )
}

export default DirectoryFormWithAddIcon

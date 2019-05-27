import React, { useState, Fragment } from 'react'
import { RawDraftContentBlock } from 'draft-js'
import BasicButton from '../../atoms/Buttons/BasicButton'
import CommitFormPopover from '../CommitFormPopover'

interface Props {
  currentUser: firebase.User
  directoryId: string
  branchId: string
  branchName: string
  rawContentBlocks: RawDraftContentBlock[]
}

const CommitFormWithButton: React.FC<Props> = props => {
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
      <BasicButton className="commit" onClick={handleClickButton}>
        Commit
      </BasicButton>
      <CommitFormPopover
        {...props}
        isOpen={isOpen}
        anchorElement={anchorElement}
        handleClose={handleClose}
      />
    </Fragment>
  )
}

export default CommitFormWithButton

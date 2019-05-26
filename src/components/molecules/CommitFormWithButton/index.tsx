import React, { useState, Fragment } from 'react'
import { RawDraftContentBlock } from 'draft-js'
import BasicButton from '../../atoms/Buttons/BasicButton'

interface Props {
  currentUser: firebase.User
  directoryId: string
  branchId: string
  rawContentBlocks: RawDraftContentBlock[]
}

const CommitFormWithButton: React.FC<Props> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <Fragment>
      <BasicButton
        colorType="whiteBase"
        className="commit"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        Commit
      </BasicButton>
      <div>{isModalOpen ? 'open' : 'closed'}</div>
    </Fragment>
  )
}

export default CommitFormWithButton

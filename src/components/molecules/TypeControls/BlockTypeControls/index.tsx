import React, { Fragment } from 'react'

import StyleButton from '../../../atoms/Buttons/MarkdownButton'
import { BLOCK_TYPES } from '../../../../constants/MarkdownEditor/editor_type'

interface Props {
  onToggle: (blockStyle: string) => void
}

const BlockTypeControls: React.FC<Props> = ({ onToggle }) => {
  return (
    <Fragment>
      {BLOCK_TYPES.map(type => (
        <StyleButton key={type.label} label={type.label} onToggle={onToggle} style={type.style} />
      ))}
    </Fragment>
  )
}

export default BlockTypeControls

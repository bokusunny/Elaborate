import React, { Fragment } from 'react'

import StyleButton from '../../../atoms/Buttons/MarkdownButtons/StyleButton'
import { BLOCK_TYPES } from '../../../../constants/MarkdownEditor/editor_type'

interface Props {
  onToggle: (blockStyle: string) => void
}

const BlockTypeControls: React.FC<Props> = ({ onToggle }) => (
  <Fragment>
    {BLOCK_TYPES.map(type => (
      <StyleButton key={type.label} label={type.label} onToggle={onToggle} style={type.style} />
    ))}
  </Fragment>
)

export default BlockTypeControls

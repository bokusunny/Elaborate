import React, { Fragment } from 'react'

import StyleButton from '../../../atoms/Buttons/MarkdownButtons/StyleButton'
import { INLINE_STYLES } from '../../../../common/constants/editor'

interface Props {
  onToggle: (inlineStyle: string) => void
}

const InlineStyleControls: React.FC<Props> = ({ onToggle }) => (
  <Fragment>
    {INLINE_STYLES.map(type => (
      <StyleButton key={type.label} label={type.label} onToggle={onToggle} style={type.style} />
    ))}
  </Fragment>
)

export default InlineStyleControls

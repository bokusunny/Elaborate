import React from 'react'
import { EditorState } from 'draft-js'

import StyleButton from '../../../atoms/Buttons/MarkdownButton'
import { INLINE_STYLES } from '../../../../constants/MarkdownEditor/editor_type'

interface StyleObject {
  editorState: EditorState
  onToggle: (inlineStyle: string) => void
}

const InlineStyleControls = (props: StyleObject) => {
  return (
    <div>
      {INLINE_STYLES.map(type => {
        return (
          <StyleButton
            key={type.label}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        )
      })}
    </div>
  )
}

export default InlineStyleControls

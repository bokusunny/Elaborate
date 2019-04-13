import React from 'react'
import { EditorState } from 'draft-js'

import StyleButton from '../../../atoms/Buttons/MarkdownButton'
import { BLOCK_TYPES } from '../../../../constants/MarkdownEditor/editor_type'

interface StyleObject {
  editorState: EditorState
  onToggle: Function
}

const BlockTypeControls = (props: StyleObject) => {
  return (
    <div>
      {BLOCK_TYPES.map(type => {
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

export default BlockTypeControls

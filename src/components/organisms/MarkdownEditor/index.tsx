import React, { Fragment, useState } from 'react'
import { Editor, EditorState, RichUtils, DraftHandleValue } from 'draft-js'

import BlockTypeControls from '../../molecules/TypeControls/BlockTypeControls'
import InlineStyleControls from '../../molecules/TypeControls/InlineStyleControls'
import { STYLE_MAP } from '../../../constants/MarkdownEditor/editor_style'
import * as styles from './style.css'

const MarkdownEditor: React.FC<{}> = () => {
  const { styleButtons } = styles
  const initialEditorState: EditorState = EditorState.createEmpty()
  const [editorState, setEditorState] = useState(initialEditorState)

  const onChange = (editorState: EditorState) => {
    setEditorState(editorState)
  }

  const handleKeyCommand = (command: string, editorState: EditorState): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      onChange(newState)
      return 'handled'
    } else {
      return 'not-handled'
    }
  }

  const toggleInlineStyle = (inlineStyle: string): void => {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle))
  }

  const toggleBlockType = (blockStyle: string): void => {
    onChange(RichUtils.toggleBlockType(editorState, blockStyle))
  }

  return (
    <Fragment>
      {/* HOPE TODO: placeholderをいい感じの文章のランダムにしたい */}
      <Editor
        editorState={editorState}
        onChange={onChange}
        handleKeyCommand={handleKeyCommand}
        customStyleMap={STYLE_MAP}
        // placeholder='placeholder'
      />
      <div className={styleButtons}>
        <BlockTypeControls editorState={editorState} onToggle={toggleBlockType} />
        <InlineStyleControls editorState={editorState} onToggle={toggleInlineStyle} />
      </div>
    </Fragment>
  )
}

export default MarkdownEditor

import React, { Fragment, useState } from 'react'
import { EditorState, RichUtils, DraftHandleValue } from 'draft-js'
import createMarkdownPlugin from 'draft-js-markdown-plugin'
import Editor from 'draft-js-plugins-editor'

import BlockTypeControls from '../../molecules/TypeControls/BlockTypeControls'
import InlineStyleControls from '../../molecules/TypeControls/InlineStyleControls'
import { STYLE_MAP } from '../../../constants/MarkdownEditor/editor_style'
import * as styles from './style.css'

interface Plugin {
  blockRenderMap: Map<string, string>
  blockRendererFn: (block: string, {}) => {} | null
  blockStyleFn: (block: string) => object | null
  decorators: object[]
  handleBeforeInput: (ev: string, html: HTMLElement, setEditorState: EditorState, {}) => string
  handleKeyCommand: (command: string, setEditorState: EditorState, {}) => string
  handlePastedText: (ev: string, setEditorState: EditorState, {}) => string
  handleReturn: (ev: string, setEditorState: EditorState, {}) => string
  initialize: (setEditorState: EditorState, getEditState: EditorState) => void
  onTab: (ev: string, {}) => string
  store: {}
}

const MarkdownEditor: React.FC<{}> = () => {
  const { styleButtons } = styles

  const initialEditorState: EditorState = EditorState.createEmpty()
  const initialPluginsState: [Plugin] = [createMarkdownPlugin()]
  console.log(createMarkdownPlugin())

  const [editorState, setEditorState] = useState(initialEditorState)
  const [pluginsState, setPluginsState] = useState(initialPluginsState)

  const onChange = (editorState: EditorState) => {
    setEditorState(editorState)
    setPluginsState(pluginsState)
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

  const toggleBlockType = (blockStyle: string): void => {
    onChange(RichUtils.toggleBlockType(editorState, blockStyle))
  }

  const toggleInlineStyle = (inlineStyle: string): void => {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle))
  }

  return (
    <Fragment>
      {/* HOPE TODO: placeholderをいい感じの文章のランダムにしたい */}
      <Editor
        editorState={editorState}
        onChange={onChange}
        handleKeyCommand={handleKeyCommand}
        plugins={pluginsState}
        customStyleMap={STYLE_MAP}
        // placeholder='placeholder'
      />
      <div className={styleButtons}>
        <BlockTypeControls onToggle={toggleBlockType} />
        <InlineStyleControls onToggle={toggleInlineStyle} />
      </div>
    </Fragment>
  )
}

export default MarkdownEditor

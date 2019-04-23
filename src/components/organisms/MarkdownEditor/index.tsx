import React, { useState, useEffect } from 'react'
import { EditorState, RichUtils, DraftHandleValue, convertToRaw, ContentState } from 'draft-js'
import createMarkdownPlugin from 'draft-js-markdown-plugin'
import Editor from 'draft-js-plugins-editor'

import BlockTypeControls from '../../molecules/TypeControls/BlockTypeControls'
import InlineStyleControls from '../../molecules/TypeControls/InlineStyleControls'
import { STYLE_MAP } from '../../../constants/MarkdownEditor/editor_style'
import * as styles from './style.css'

// TODO: 型付け厳格に。ただ、そもそもmoduleの型付けの方を厳格化すべきかも。
interface Plugin {
  blockRenderMap: Map<string, any>
  blockRendererFn: (
    block: Record<string, any>,
    args: Record<string, Function>
  ) => Record<string, any>
  blockStyleFn: (block: Record<string, any>) => 'checkable-list-item' | null
  decorators: Function[]
  handleBeforeInput: (
    character: any,
    editorState: EditorState,
    args: Record<'setEditorState', Function>
  ) => string
  handleKeyCommand: (
    command: string,
    editorState: EditorState,
    args: Record<'setEditorState', Function>
  ) => string
  handlePastedText: (
    text: string,
    html: any,
    editorState: EditorState,
    args: Record<'setEditorState', Function>
  ) => string
  handleReturn: (
    ev: any,
    editorState: EditorState,
    args: Record<'setEditorState', Function>
  ) => string
  initialize: (args: Record<'getEditorState' | 'setEditorState', Function>) => void
  onTab: (ev: string, args: Record<'getEditorState' | 'setEditorState', Function>) => string
  store: {}
}

const MarkdownEditor: React.FC<{}> = () => {
  const { editorWrapper, styleButtons } = styles

  const initialEditorState: EditorState = EditorState.createEmpty()
  const initialPluginsState: Plugin = [createMarkdownPlugin()]

  const [editorState, setEditorState] = useState(initialEditorState)
  const [pluginsState, setPluginsState] = useState(initialPluginsState)
  const [styleButtonsState, setIsStyleButtons] = useState({ isStyleButtons: true })

  const getInputValue = () => {
    const contentState: ContentState = editorState.getCurrentContent()
    const rawContentState = convertToRaw(contentState)
    const lastInputValue = rawContentState.blocks.slice(-1)[0].text
    return lastInputValue
  }

  useEffect(() => {
    const inputValue = getInputValue()

    if (inputValue === '') {
      setIsStyleButtons({ isStyleButtons: true })
    } else {
      setIsStyleButtons({ isStyleButtons: false })
    }
  }, [editorState])

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

  const { isStyleButtons } = styleButtonsState

  return (
    <div className={editorWrapper}>
      {/* HOPE TODO: placeholderをいい感じの文章のランダムにしたい */}
      <Editor
        editorState={editorState}
        onChange={onChange}
        handleKeyCommand={handleKeyCommand}
        plugins={pluginsState}
        customStyleMap={STYLE_MAP}
        // placeholder='placeholder'
      />
      {isStyleButtons && (
        <div className={styleButtons}>
          <BlockTypeControls onToggle={toggleBlockType} />
          <InlineStyleControls onToggle={toggleInlineStyle} />
        </div>
      )}
    </div>
  )
}

export default MarkdownEditor

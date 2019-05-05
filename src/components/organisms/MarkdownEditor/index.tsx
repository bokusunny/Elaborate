import React, { useState, useEffect } from 'react'
import {
  EditorState,
  RichUtils,
  DraftHandleValue,
  convertToRaw,
  ContentState,
  RawDraftContentState,
} from 'draft-js'
import createMarkdownPlugin from 'draft-js-markdown-plugin'
import Editor from 'draft-js-plugins-editor'

import EditorToolBar from '../../molecules/EditorToolBar'

import { STYLE_MAP } from '../../../constants/MarkdownEditor/editor_style'
import * as styles from './style.css'

import { Plugin } from './types'

const MarkdownEditor: React.FC<{}> = () => {
  const { editorWrapper } = styles

  const initialEditorState: EditorState = EditorState.createEmpty()
  const initialPluginsState: [Plugin] = [createMarkdownPlugin()]

  const [editorState, setEditorState] = useState(initialEditorState)
  const [pluginsState, setPluginsState] = useState(initialPluginsState)
  const [shouldShowToolBar, setShouldShowToolBar] = useState(true)
  const [shouldShowToolBarInline, setShouldShowToolBarInline] = useState(false)

  const getInputValue = () => {
    if (!editorState) return

    const contentState: ContentState = editorState.getCurrentContent()
    const rawContentState: RawDraftContentState = convertToRaw(contentState)
    const lastInputValue = rawContentState.blocks.slice(-1)[0].text
    return lastInputValue
  }

  const getSelectedText = () => {
    if (!editorState) return
    const selectionState = editorState.getSelection()
    const anchorKey = selectionState.getAnchorKey()
    const currentContent = editorState.getCurrentContent()
    const currentContentBlock = currentContent.getBlockForKey(anchorKey)
    const start = selectionState.getStartOffset()
    const end = selectionState.getEndOffset()
    const selectedText = currentContentBlock.getText().slice(start, end)

    return selectedText
  }

  const onChange = (editorState: EditorState) => {
    setEditorState(editorState)
    setPluginsState(pluginsState)
  }

  useEffect(() => {
    const inputValue = getInputValue()
    const selectedText = getSelectedText()

    if (inputValue === '') {
      setShouldShowToolBar(true)
      setShouldShowToolBarInline(false)
    } else if (selectedText === '') {
      setShouldShowToolBar(false)
    } else {
      setShouldShowToolBar(true)
      setShouldShowToolBarInline(true)
    }
  }, [editorState])

  useEffect(() => onChange(RichUtils.toggleBlockType(editorState, 'header-one')), [])

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
      <EditorToolBar
        shouldShowToolBar={shouldShowToolBar}
        shouldShowToolBarInline={shouldShowToolBarInline}
        toggleBlockType={toggleBlockType}
        toggleInlineStyle={toggleInlineStyle}
      />
    </div>
  )
}

export default MarkdownEditor

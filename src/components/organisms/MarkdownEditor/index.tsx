import React, { useState, useEffect } from 'react'
import {
  EditorState,
  RichUtils,
  DraftHandleValue,
  convertToRaw,
  DraftEditorCommand,
} from 'draft-js'
import createMarkdownPlugin from 'draft-js-markdown-plugin'
import Editor from 'draft-js-plugins-editor'

import EditorToolBar from '../../molecules/EditorToolBar'
import CommitForm from '../../molecules/Forms/CommitForm'

import { STYLE_MAP } from '../../../constants/MarkdownEditor/editor_style'
import * as styles from './style.css'
const { editorWrapper } = styles

import { Plugin } from './types'

interface Props {
  currentUser: firebase.User
  directoryId: string
  branchId: string
}

const MarkdownEditor: React.FC<Props> = ({ currentUser, directoryId, branchId }) => {
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty())
  const [shouldShowToolBar, setShouldShowToolBar] = useState(true)
  const [shouldShowToolBarInline, setShouldShowToolBarInline] = useState(false)

  const contentState = editorState.getCurrentContent()
  const rawContentState = convertToRaw(contentState)
  const rawContentBlocks = rawContentState.blocks

  const getIsInputValueEmpty = () => {
    return rawContentBlocks.length === 1 && rawContentBlocks[0].text === ''
  }

  const getIsSelectedTextEmpty = () => {
    const selectionState = editorState.getSelection()
    const anchorKey = selectionState.getAnchorKey()
    const currentContent = editorState.getCurrentContent()
    const currentContentBlock = currentContent.getBlockForKey(anchorKey)
    const start = selectionState.getStartOffset()
    const end = selectionState.getEndOffset()
    const selectedText = currentContentBlock.getText().slice(start, end)

    return selectedText === ''
  }

  const onChange = (editorState: EditorState) => {
    setEditorState(editorState)
  }

  useEffect(() => {
    const isInputValueEmpty = getIsInputValueEmpty()
    const isSelectedTextEmpty = getIsSelectedTextEmpty()

    if (isInputValueEmpty) {
      setShouldShowToolBar(true)
      setShouldShowToolBarInline(false)
    } else if (isSelectedTextEmpty) {
      setShouldShowToolBar(false)
    } else {
      setShouldShowToolBar(true)
      setShouldShowToolBarInline(true)
    }
  }, [editorState])

  useEffect(() => setEditorState(RichUtils.toggleBlockType(editorState, 'header-one')), [])

  const handleKeyCommand = (
    command: DraftEditorCommand,
    editorState: EditorState
  ): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      onChange(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  const toggleBlockType = (blockStyle: string): void => {
    onChange(RichUtils.toggleBlockType(editorState, blockStyle))
  }

  const toggleInlineStyle = (inlineStyle: string): void => {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle))
  }

  // NOTE: Pluginの型は厳密につけられていないのでバグの温床になっていることに留意
  const plugins: Plugin[] = [createMarkdownPlugin()]

  return (
    <div className={editorWrapper}>
      {/* HOPE TODO: placeholderをいい感じの文章のランダムにしたい */}
      <Editor
        editorState={editorState}
        onChange={onChange}
        handleKeyCommand={handleKeyCommand}
        plugins={plugins}
        customStyleMap={STYLE_MAP}
        // placeholder='placeholder'
      />
      <EditorToolBar
        shouldShowToolBar={shouldShowToolBar}
        shouldShowToolBarInline={shouldShowToolBarInline}
        toggleBlockType={toggleBlockType}
        toggleInlineStyle={toggleInlineStyle}
      />
      <CommitForm
        currentUser={currentUser}
        directoryId={directoryId}
        branchId={branchId}
        rawContentBlocks={rawContentBlocks}
      />
    </div>
  )
}

export default MarkdownEditor

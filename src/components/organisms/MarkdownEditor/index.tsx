import React, { useState, useEffect, Dispatch } from 'react'
import {
  EditorState,
  RichUtils,
  DraftHandleValue,
  convertToRaw,
  DraftEditorCommand,
  RawDraftContentState,
  convertFromRaw,
} from 'draft-js'
import createMarkdownPlugin from 'draft-js-markdown-plugin'
import Editor from 'draft-js-plugins-editor'

import EditorToolBar from '../../molecules/EditorToolBar'
import CommitForm from '../../molecules/Forms/CommitForm'

import { STYLE_MAP } from '../../../common/constants/editor'
import * as styles from './style.css'
const { editorWrapper } = styles

interface Props {
  currentUser: firebase.User
  directoryId: string
  branchId: string
}

const initEditorState = (
  branchId: string,
  editorState: EditorState,
  setEditorState: Dispatch<React.SetStateAction<EditorState>>
) => {
  const rawStateSavedOnStorage = localStorage.getItem(branchId)
  if (!rawStateSavedOnStorage) {
    setEditorState(RichUtils.toggleBlockType(editorState, 'header-one'))
  } else {
    const initRawState: RawDraftContentState = JSON.parse(rawStateSavedOnStorage)
    const initContentState = convertFromRaw(initRawState)
    setEditorState(EditorState.createWithContent(initContentState))
  }
}

const changeToolBarDisplay = (
  branchId: string,
  editorState: EditorState,
  setShouldShowToolBar: Dispatch<React.SetStateAction<boolean>>,
  setShouldShowToolBarInline: Dispatch<React.SetStateAction<boolean>>,
  rawContentState: RawDraftContentState
) => {
  const selectionState = editorState.getSelection()
  const anchorKey = selectionState.getAnchorKey()
  const currentContent = editorState.getCurrentContent()
  const currentContentBlock = currentContent.getBlockForKey(anchorKey)
  const selectStart = selectionState.getStartOffset()
  const selectEnd = selectionState.getEndOffset()
  const currentBlockText = currentContentBlock.getText()
  const currentBlockType = currentContentBlock.getType()

  const isCurrentContentValueEmpty = currentBlockText === '' && currentBlockType === 'unstyled'
  const isSelectedTextEmpty = currentBlockText.slice(selectStart, selectEnd) === ''

  if (isCurrentContentValueEmpty) {
    setShouldShowToolBar(true)
    setShouldShowToolBarInline(false)
  } else if (isSelectedTextEmpty) {
    setShouldShowToolBar(false)
  } else {
    setShouldShowToolBar(true)
    setShouldShowToolBarInline(true)
  }
  localStorage.setItem(branchId, JSON.stringify(rawContentState))
}

const MarkdownEditor: React.FC<Props> = ({ currentUser, directoryId, branchId }) => {
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty())
  const [shouldShowToolBar, setShouldShowToolBar] = useState(true)
  const [shouldShowToolBarInline, setShouldShowToolBarInline] = useState(false)

  const contentState = editorState.getCurrentContent()
  const rawContentState = convertToRaw(contentState)
  const rawContentBlocks = rawContentState.blocks // 複数回使うのでここで定義

  useEffect(() => initEditorState(branchId, editorState, setEditorState), [])

  useEffect(() => {
    changeToolBarDisplay(
      branchId,
      editorState,
      setShouldShowToolBar,
      setShouldShowToolBarInline,
      rawContentState
    )
  }, [editorState])

  const handleKeyCommand = (
    command: DraftEditorCommand,
    editorState: EditorState
  ): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      setEditorState(newState)
      return 'handled'
    }
    return 'not-handled'
  }

  return (
    <div className={editorWrapper}>
      {/* HOPE TODO: placeholderをいい感じの文章のランダムにしたい */}
      <Editor
        editorState={editorState}
        onChange={(editorState: EditorState) => setEditorState(editorState)}
        handleKeyCommand={handleKeyCommand}
        plugins={[createMarkdownPlugin()]}
        customStyleMap={STYLE_MAP}
        // placeholder='placeholder'
      />
      <EditorToolBar
        shouldShowToolBar={shouldShowToolBar}
        shouldShowToolBarInline={shouldShowToolBarInline}
        toggleBlockType={(blockStyle: string) => {
          setEditorState(RichUtils.toggleBlockType(editorState, blockStyle))
        }}
        toggleInlineStyle={(inlineStyle: string) => {
          setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle))
        }}
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

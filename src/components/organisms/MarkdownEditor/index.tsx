import React, { useState, useEffect, Fragment, Dispatch } from 'react'
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
import { markdownToDraft } from 'markdown-draft-js'

import EditorToolBar from '../../molecules/EditorToolBar'
import CommitForm from '../../molecules/Forms/CommitForm'

import { STYLE_MAP, features } from '../../../common/constants/editor'
import * as styles from './style.css'
const { editorWrapper } = styles

interface Props {
  currentUser: firebase.User
  directoryId: string
  branchId: string
  branchType: 'master' | 'normal'
  body: string
}

const initEditorState = (
  branchId: string,
  body: string,
  editorState: EditorState,
  setEditorState: Dispatch<React.SetStateAction<EditorState>>
) => {
  const rawStateSavedOnStorage = localStorage.getItem(branchId)
  if (!rawStateSavedOnStorage) {
    if (body === '') {
      setEditorState(RichUtils.toggleBlockType(editorState, 'header-one'))
    } else {
      // TODO: markdownToDraftはマークダウン記号に少し齟齬がある(*foo*がitalicになるなど)のでFix
      const initRawState: RawDraftContentState = markdownToDraft(body)
      const initContentState = convertFromRaw(initRawState)
      setEditorState(EditorState.createWithContent(initContentState))
    }
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
    localStorage.setItem(branchId, JSON.stringify(rawContentState))
  } else {
    setShouldShowToolBar(true)
    setShouldShowToolBarInline(true)
    localStorage.setItem(branchId, JSON.stringify(rawContentState))
  }
}

const MarkdownEditor: React.FC<Props> = ({
  currentUser,
  directoryId,
  branchId,
  branchType,
  body,
}) => {
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty())
  const [shouldShowToolBar, setShouldShowToolBar] = useState(true)
  const [shouldShowToolBarInline, setShouldShowToolBarInline] = useState(false)

  const contentState = editorState.getCurrentContent()
  const rawContentState = convertToRaw(contentState)
  const rawContentBlocks = rawContentState.blocks // 複数回使うのでここで定義

  useEffect(() => initEditorState(branchId, body, editorState, setEditorState), [])

  useEffect(() => {
    // masterの場合はtoolBarは常に表示されない
    if (branchType !== 'master') {
      changeToolBarDisplay(
        branchId,
        editorState,
        setShouldShowToolBar,
        setShouldShowToolBarInline,
        rawContentState
      )
    }
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
        plugins={[createMarkdownPlugin({ features })]}
        customStyleMap={STYLE_MAP}
        readOnly={branchType === 'master'}
        // placeholder='placeholder'
      />
      {branchType !== 'master' && (
        <Fragment>
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
        </Fragment>
      )}
    </div>
  )
}

export default MarkdownEditor

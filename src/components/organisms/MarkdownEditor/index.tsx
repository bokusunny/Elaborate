import React, { useState, useEffect, Fragment, Dispatch } from 'react'
import { connect } from 'react-redux'
import {
  EditorState,
  RichUtils,
  DraftHandleValue,
  convertToRaw,
  DraftEditorCommand,
  RawDraftContentState,
  convertFromRaw,
} from 'draft-js'
import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin'
import Editor from 'draft-js-plugins-editor'
import { markdownToDraft } from 'markdown-draft-js'
import * as H from 'history'
import Alert from 'react-s-alert'

import EditorToolBar from '../../molecules/EditorToolBar'
import CommitFormWithButton from '../../molecules/FormWithButton/CommitFormWithButton'
import BasicButton from '../../atoms/Buttons/BasicButton'
import { fetchLatestCommitBody } from '../../../actions/commits'

import { STYLE_MAP } from '../../../common/constants/editor'
import { convertToText } from '../../../common/functions'
import * as styles from './style.css'
const { editorWrapper, editorButtons } = styles

interface Props {
  currentUser: firebase.User
  directoryId: string
  branchId: string
  branchName: string
  baseBranchId: string
  branchType: 'master' | 'normal'
  body: string
  history: H.History
}

interface DispatchProps {
  fetchLatestCommitBody: (
    currentUserUid: string,
    directoryId: string,
    branchId: string
  ) => Promise<string>
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
      const initRawState: RawDraftContentState = markdownToDraft(body, { preserveNewlines: true })
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

  const isInitialState = rawContentState.blocks.length === 1 && currentBlockText === ''
  const isCurrentContentValueEmpty = currentBlockText === '' && currentBlockType === 'unstyled'
  const isSelectedTextEmpty = currentBlockText.slice(selectStart, selectEnd) === ''

  if (isInitialState || isCurrentContentValueEmpty) {
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

const MarkdownEditor: React.FC<Props & DispatchProps> = ({
  currentUser,
  directoryId,
  branchId,
  branchName,
  baseBranchId,
  branchType,
  body,
  history,
  fetchLatestCommitBody,
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

  const checkIsFullyCommitted = () => {
    fetchLatestCommitBody(currentUser.uid, directoryId, branchId).then(body => {
      const rawStateSavedOnStorage = localStorage.getItem(branchId)
      if (!rawStateSavedOnStorage) {
        Alert.warning('Editor is still empty...')
        return
      }

      const bodyOnLocalStorage = convertToText(JSON.parse(rawStateSavedOnStorage).blocks)
      if (
        body === bodyOnLocalStorage ||
        window.confirm(
          "You haven't committed your changes.\nAre you sure you want to leave this page?"
        )
      ) {
        history.push(`/${directoryId}/diff/${baseBranchId}/${branchId}`)
      }
    })
  }

  return (
    <div className={editorWrapper}>
      {/* HOPE TODO: placeholderをいい感じの文章のランダムにしたい */}
      <Editor
        editorState={editorState}
        onChange={(editorState: EditorState) => setEditorState(editorState)}
        handleKeyCommand={handleKeyCommand}
        plugins={[createMarkdownShortcutsPlugin()]}
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
          <div className={editorButtons}>
            <CommitFormWithButton
              currentUser={currentUser}
              directoryId={directoryId}
              branchId={branchId}
              branchName={branchName}
              rawContentBlocks={rawContentBlocks}
            />
            <BasicButton
              colorType="whiteBaseWithBorder"
              className="checkDiff"
              onClick={checkIsFullyCommitted}
            >
              Check diff
            </BasicButton>
          </div>
        </Fragment>
      )}
    </div>
  )
}

export default connect(
  null,
  { fetchLatestCommitBody }
)(MarkdownEditor)

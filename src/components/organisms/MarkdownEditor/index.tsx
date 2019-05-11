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
import createMarkdownPlugin from 'draft-js-markdown-plugin'
import Editor from 'draft-js-plugins-editor'
import CircularProgress from '@material-ui/core/CircularProgress'

import EditorToolBar from '../../molecules/EditorToolBar'
import CommitForm from '../../molecules/Forms/CommitForm'

import { STYLE_MAP } from '../../../common/constants/editor'
import { ReduxAPIStruct } from '../../../common/static-types/api-struct'
import { fetchLatestCommitBody } from '../../../actions/commits'
import * as styles from './style.css'
const { editorWrapper } = styles

interface Props {
  currentUser: firebase.User
  directoryId: string
  branchId: string
  branchType: 'master' | 'normal'
  latestCommitBody: ReduxAPIStruct<string>
}

interface DispatchProps {
  fetchLatestCommitBody: (
    currentUserUid: string,
    directoryId: string,
    branchId: string
  ) => Promise<void>
}

const initEditorState = (
  currentUserUid: string,
  directoryId: string,
  branchId: string,
  editorState: EditorState,
  setEditorState: Dispatch<React.SetStateAction<EditorState>>,
  latestCommitBody: string | null,
  fetchLatestCommitBody: (
    currentUserUid: string,
    directoryId: string,
    branchId: string
  ) => Promise<void>
) => {
  const rawStateSavedOnStorage = localStorage.getItem(branchId)
  if (!rawStateSavedOnStorage) {
    fetchLatestCommitBody(currentUserUid, directoryId, branchId).then(() => {
      if (latestCommitBody === null) return
      if (latestCommitBody === '') {
        // console.log('hi!')
        setEditorState(RichUtils.toggleBlockType(editorState, 'header-one'))
      } else {
        // ここでlatestCommitBodyをeditorStateに適用
      }
    })
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

const MarkdownEditor: React.FC<Props & DispatchProps> = ({
  currentUser,
  directoryId,
  branchId,
  branchType,
  latestCommitBody,
  fetchLatestCommitBody,
}) => {
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty())
  const [shouldShowToolBar, setShouldShowToolBar] = useState(true)
  const [shouldShowToolBarInline, setShouldShowToolBarInline] = useState(false)

  const contentState = editorState.getCurrentContent()
  const rawContentState = convertToRaw(contentState)
  const rawContentBlocks = rawContentState.blocks // 複数回使うのでここで定義

  useEffect(
    () =>
      initEditorState(
        currentUser.uid,
        directoryId,
        branchId,
        editorState,
        setEditorState,
        latestCommitBody.data,
        fetchLatestCommitBody
      ),
    []
  )

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

  if (latestCommitBody.status === 'fetching') return <CircularProgress />

  return (
    <div className={editorWrapper}>
      {/* HOPE TODO: placeholderをいい感じの文章のランダムにしたい */}
      <Editor
        editorState={editorState}
        onChange={(editorState: EditorState) => setEditorState(editorState)}
        handleKeyCommand={handleKeyCommand}
        plugins={[createMarkdownPlugin()]}
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

export default connect(
  null,
  { fetchLatestCommitBody }
)(MarkdownEditor)

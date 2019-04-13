import React, { Fragment } from 'react'
import { Editor, EditorState, RichUtils, DraftHandleValue } from 'draft-js'
import * as inlineStyles from './style'
import * as styles from './style.css'

const { useState } = React

// TODO: 見にくいのでprettierの設定を変える
const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underliner', style: 'UNDERLINE' },
]

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' }, 
  { label: 'H2', style: 'header-two' }, 
  { label: 'Blockquote', style: 'blockquote' },
]

interface Props {
  label: string
  onToggle: Function
  style: string
}

interface StyleObject {
  editorState: EditorState
  onToggle: Function
}

const MarkdownEditor: React.FC<{}> = () => {
  const { styleButtons } = styles
  const { styleMap } = inlineStyles
  const initialEditorState: EditorState = EditorState.createEmpty()
  const [editorState, setEditorState] = useState(initialEditorState)

  const onChange = (editorState: EditorState) => {
    setEditorState(editorState)
  }

  const handleKeyCommand = (command: string, editorState: EditorState): DraftHandleValue => {
    console.log('hoge')
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

  const InlineStyleControls = (props: StyleObject) => {
    return (
      <div>
        {INLINE_STYLES.map(type => {
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

  const toggleBlockType = (blockStyle: string) => {
    onChange(RichUtils.toggleBlockType(editorState, blockStyle))
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

  const StyleButton: React.FC<Props> = ({ label, onToggle, style }) => {
    const OnToggle = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      e.preventDefault()
      onToggle(style)
    }

    return (
      <span
        onMouseDown={OnToggle}
      >
        {label}
      </span>
    )
  }

  return (
    <Fragment>
      {/* HOPE TODO: placeholderをいい感じの文章のランダムにしたい */}
      <Editor
        editorState={editorState} 
        onChange={onChange} 
        handleKeyCommand={handleKeyCommand}
        customStyleMap={styleMap}
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
 
import React, { Fragment } from 'react'
import { Editor, EditorState, RichUtils } from 'draft-js'

const { useState } = React

// TODO: 見にくいのでprettierの設定を変える
const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underliner', style: 'UNDERLINE' },
]

const BLOCK_TYPES = [{ label: 'H1', style: 'header-one' }, { label: 'H2', style: 'header-two' }]

interface Props {
  label: string
  onToggle: Function
  style: string
}

interface Object {
  editorState: EditorState
  onToggle: Function
}

const MarkdownEditor: React.FC<{}> = () => {
  const initialEditorState: EditorState = EditorState.createEmpty()
  const [editorState, setEditorState] = useState(initialEditorState)

  const onChange = (editorState: EditorState) => {
    setEditorState(editorState)
  }

  const toggleInlineStyle = (inlineStyle: string): void => {
    onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle))
  }

  const InlineStyleControls = (props: Object) => {
    console.log(props)
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

  const BlockTypeControls = (props: Object) => {
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
      <BlockTypeControls editorState={editorState} onToggle={toggleBlockType} />
      <InlineStyleControls editorState={editorState} onToggle={toggleInlineStyle} />
      <Editor editorState={editorState} onChange={onChange} />
    </Fragment>
  )
}

 export default MarkdownEditor
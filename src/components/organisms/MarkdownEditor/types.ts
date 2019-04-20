import { EditorState } from 'draft-js'

export interface Plugin {
  blockRenderMap: Map<string, string>
  blockRendererFn: (block: string, argument: object) => {} | null
  blockStyleFn: (block: string) => object | null
  decorators: object[]
  handleBeforeInput: (character: string, editorState: EditorState, setEditorState: object) => string
  handleKeyCommand: (command: string, editorState: EditorState, setEditorState: object) => string
  handlePastedText: (
    text: string,
    html: HTMLElement,
    editorState: EditorState,
    setEditorState: object
  ) => string
  handleReturn: (ev: string, editorState: EditorState, setEditorState: object) => string
  initialize: (setEditorState: EditorState, getEditState: EditorState) => void
  onTab: (ev: string, editorState: object) => string
  store: {}
}

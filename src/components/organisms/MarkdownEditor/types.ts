import { EditorState } from 'draft-js'

// TODO: 型付け厳格に。ただ、そもそもmoduleの型付けの方を厳格化すべきかも。
export interface Plugin {
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

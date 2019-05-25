/*
 * available Inline features:
 * ['BOLD', 'ITALIC', 'CODE', 'STRIKETHROUGH', 'LINK', 'IMAGE']
 * Available Block features:
 * [
 *  'header-one', 'header-two', 'header-three', 'header-four', 'header-five', 'header-six',
 *  'CODE', 'ordered-list-item', 'unordered-list-item', 'blockquote',
 * ]
 */

export const STYLE_MAP = {
  BOLD: {
    fontWeight: 'bold',
  },

  ITALIC: {
    fontStyle: 'italic',
  },
}

export const INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
]

export const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'Quote', style: 'blockquote' },
  { label: 'List', style: 'unordered-list-item' },
]

// editorで使えるマークダウン一覧
export const features = {
  inline: ['BOLD', 'ITALIC'],
  block: ['header-one', 'header-two', 'unordered-list-item', 'blockquote'],
}

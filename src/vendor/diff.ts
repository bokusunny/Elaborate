import 'diff2html'
import 'diff2html/dist/diff2html-ui'

interface Window {
  // TODO: 厳密な型付けをしたい
  Diff2HtmlUI: any
}

declare const window: Window

const Diff2HtmlUI = window.Diff2HtmlUI !== 'undefined' ? window.Diff2HtmlUI : null

export default Diff2HtmlUI

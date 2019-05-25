import React, { Fragment } from 'react'
import * as H from 'history'
import Header from '../../organisms/Header'
import MarkdownEditor from '../../organisms/MarkdownEditor'

interface Props {
  currentUser: firebase.User
  directoryId: string
  directoryName: string
  branchId: string
  branchName: string
  branchType: 'master' | 'normal'
  body: string
  history: H.History
}

const EditorTemplate: React.FC<Props> = ({ history, directoryName, branchName, ...rest }) => (
  <Fragment>
    <Header
      colorType="whiteBase"
      pageType="edit"
      history={history}
      directoryName={directoryName}
      branchName={branchName}
    />
    <MarkdownEditor {...rest} />
  </Fragment>
)

export default EditorTemplate

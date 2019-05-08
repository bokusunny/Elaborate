import React, { Fragment } from 'react'
import * as H from 'history'
import Header from '../../molecules/Header'
import MarkdownEditor from '../../organisms/MarkdownEditor'

interface Props {
  currentUser: firebase.User
  directoryId: string
  branchId: string
  history: H.History
}

const EditorTemplate: React.FC<Props> = props => (
  <Fragment>
    <Header colorType="whiteBase" pageType="edit" history={props.history} />
    <MarkdownEditor {...props} />
  </Fragment>
)

export default EditorTemplate

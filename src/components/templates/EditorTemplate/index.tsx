import React, { Fragment } from 'react'
import * as H from 'history'
import Header from '../../molecules/Header'
import MarkdownEditor from '../../organisms/MarkdownEditor'

interface Props {
  currentUser: firebase.User
  directoryId: string
  branchId: string
  branchType: 'master' | 'normal' | undefined
  history: H.History
}

const EditorTemplate: React.FC<Props> = ({ history, ...rest }) => (
  <Fragment>
    <Header colorType="whiteBase" pageType="edit" history={history} />
    <MarkdownEditor {...rest} />
  </Fragment>
)

export default EditorTemplate

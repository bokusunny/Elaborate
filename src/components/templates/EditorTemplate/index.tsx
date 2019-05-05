import React, { Fragment } from 'react'
import Header from '../../molecules/Header'
import MarkdownEditor from '../../organisms/MarkdownEditor'

interface Props {
  currentUser: firebase.User
  directoryId: string
  branchId: string
}

const EditorTemplate: React.FC<Props> = props => (
  <Fragment>
    <Header colorType="whiteBase" />
    <MarkdownEditor {...props} />
  </Fragment>
)

export default EditorTemplate

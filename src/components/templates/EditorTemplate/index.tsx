import React, { Fragment } from 'react'
import Header from '../../molecules/Header'
import MarkdownEditor from '../../organisms/MarkdownEditor'

const EditorTemplate: React.FC<{}> = () => (
  <Fragment>
    <Header colorType="whiteBase" />
    <MarkdownEditor />
  </Fragment>
)

export default EditorTemplate

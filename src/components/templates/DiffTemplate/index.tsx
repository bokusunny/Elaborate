import React, { Fragment } from 'react'
import * as H from 'history'
import Header from '../../organisms/Header'
import Diff from '../../organisms/Diff'

interface Props {
  history: H.History
  diffLeftFileBody: string
  diffRightFileBody: string
  currentUserUid: string
  directoryId: string
  branchId: string
}

const DiffTemplate: React.FC<Props> = props => {
  return (
    <Fragment>
      <Header colorType="whiteBase" pageType="diff" history={props.history} />
      <div>Diff Page</div>
      <Diff {...props} />
    </Fragment>
  )
}

export default DiffTemplate

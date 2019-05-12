import React, { Fragment } from 'react'
import * as H from 'history'
import Header from '../../molecules/Header'
import Diff from '../../organisms/Diff'

interface Props {
  history: H.History
  diffLeftFileBody: string
  diffRightFileBody: string
}

const DiffTemplate: React.FC<Props> = ({ history, diffLeftFileBody, diffRightFileBody }) => {
  return (
    <Fragment>
      <Header colorType="whiteBase" pageType="diff" history={history} />
      <div>Diff Page</div>
      <Diff diffLeftFileBody={diffLeftFileBody} diffRightFileBody={diffRightFileBody} />
    </Fragment>
  )
}

export default DiffTemplate

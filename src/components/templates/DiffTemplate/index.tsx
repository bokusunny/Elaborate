import React, { Fragment } from 'react'
import * as H from 'history'
import Header from '../../molecules/Header'

interface Props {
  history: H.History
  diffLeftFile: string
  diffRightFile: string
}
const DiffTemplate: React.FC<Props> = ({ history, diffLeftFile, diffRightFile }) => {
  console.log(diffLeftFile)
  console.log(diffRightFile)
  return (
    <Fragment>
      <Header colorType="whiteBase" pageType="diff" history={history} />
      <div>Diff Page</div>
    </Fragment>
  )
}

export default DiffTemplate

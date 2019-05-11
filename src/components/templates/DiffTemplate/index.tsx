import React, { Fragment } from 'react'
import * as H from 'history'
import { ReduxAPIStruct } from '../../../common/static-types/api-struct'
import Header from '../../molecules/Header'

interface Props {
  history: H.History
  diffLeftFile: ReduxAPIStruct<string>
  diffRightFile: ReduxAPIStruct<string>
}
const DiffTemplate: React.FC<Props> = ({ history, diffLeftFile, diffRightFile }) => {
  return (
    <Fragment>
      <Header colorType="whiteBase" pageType="diff" history={history} />
      <div>Diff Page</div>
      <div>{diffLeftFile.data}</div>
      <div>{diffRightFile.data}</div>
    </Fragment>
  )
}

export default DiffTemplate

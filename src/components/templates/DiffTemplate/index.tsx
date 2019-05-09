import React, { Fragment } from 'react'
import * as H from 'history'
import Header from '../../molecules/Header'

interface Props {
  history: H.History
}
const DiffTemplate: React.FC<Props> = ({ history }) => {
  return (
    <Fragment>
      <Header colorType="whiteBase" pageType="diff" history={history} />
      <div>Diff Page</div>
    </Fragment>
  )
}

export default DiffTemplate

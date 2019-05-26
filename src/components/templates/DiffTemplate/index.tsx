import React, { Fragment } from 'react'
import * as H from 'history'
import Header from '../../organisms/Header'
import Diff from '../../organisms/Diff'
import * as style from './style.css'

interface Props {
  history: H.History
  diffLeftFileBody: string
  diffLeftFileName: string
  diffRightFileBody: string
  diffRightFileName: string
  currentUserUid: string
  directoryId: string
  branchId: string
}

const DiffTemplate: React.FC<Props> = props => {
  return (
    <Fragment>
      <Header colorType="whiteBase" pageType="diff" history={props.history} />
      <div className={style.fileNameWrapper}>
        <h2 className={style.leftFileName}>{props.diffLeftFileName}</h2>
        <h2 className={style.rightFileName}>{props.diffRightFileName}</h2>
      </div>
      <Diff {...props} />
    </Fragment>
  )
}

export default DiffTemplate

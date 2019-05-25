import React, { Fragment } from 'react'
import * as H from 'history'
import HeaderTitleButton from '../../atoms/Buttons/HeaderTitleButton'
import TopicPath from '../../atoms/TopicPath'

interface Props {
  history: H.History
  pageType: 'landing' | 'myPage' | 'edit' | 'diff'
  directoryName?: string
  branchName?: string
}

const HeaderLeft: React.FC<Props> = ({ history, pageType, directoryName, branchName }) => {
  return (
    <Fragment>
      <HeaderTitleButton history={history} pageType={pageType} />
      {pageType === 'edit' && (
        <TopicPath directoryName={directoryName as string} branchName={branchName as string} />
      )}
    </Fragment>
  )
}

export default HeaderLeft

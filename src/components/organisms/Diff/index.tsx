import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { createPatch } from 'diff'
import * as H from 'history'
import Diff2HtmlUI from '../../../vendor/diff'
import { mergeBranch } from '../../../actions/branches'
import BasicButton from '../../atoms/Buttons/BasicButton'

interface Props {
  diffLeftFileBody: string
  diffRightFileBody: string
  history: H.History
  currentUserUid: string
  directoryId: string
  branchId: string
}

interface DispatchProps {
  mergeBranch: (currentUserUid: string, directoryId: string, branchId: string) => Promise<void>
}

const Diff: React.FC<Props & DispatchProps> = ({
  diffLeftFileBody,
  diffRightFileBody,
  history,
  currentUserUid,
  directoryId,
  branchId,
  mergeBranch,
}) => {
  useEffect(() => {
    const diffObj = createPatch('', diffLeftFileBody, diffRightFileBody, '', '')
    const diff2htmlUi = new Diff2HtmlUI({ diff: diffObj })

    diff2htmlUi.draw('#diff', {
      inputFormat: 'json',
      showFiles: false,
      matching: 'words',
      outputFormat: 'side-by-side',
      matchWordsThreshold: 0.25,
      synchronisedScroll: true,
      charByChar: true,
    })
  }, [diffLeftFileBody, diffRightFileBody])

  const onClickMergeButton = () => {
    mergeBranch(currentUserUid, directoryId, branchId).then(() => {
      history.push('/mypage')
    })
  }

  return (
    <Fragment>
      <div id="diff" />
      <BasicButton className="merge" onClick={onClickMergeButton}>
        Merge
      </BasicButton>
    </Fragment>
  )
}

export default connect(
  null,
  { mergeBranch }
)(Diff)

import React, { useEffect } from 'react'
import { createPatch } from 'diff'
import { ReduxAPIStruct } from '../../../common/static-types/api-struct'
import Diff2HtmlUI from '../../../vendor/diff'

interface Props {
  diffLeftFile: ReduxAPIStruct<string>
  diffRightFile: ReduxAPIStruct<string>
}

const Diff: React.FC<Props> = ({ diffLeftFile, diffRightFile }) => {
  useEffect(() => {
    if (diffLeftFile.data === null || diffRightFile.data === null) return

    const diffObj = createPatch('', diffLeftFile.data, diffRightFile.data, '', '')
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
  }, [diffLeftFile, diffRightFile])

  return <div id="diff" />
}

export default Diff

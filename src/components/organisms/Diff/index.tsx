import React, { useEffect } from 'react'
import { createPatch } from 'diff'
import Diff2HtmlUI from '../../../vendor/diff'

interface Props {
  diffLeftFileBody: string
  diffRightFileBody: string
}

const Diff: React.FC<Props> = ({ diffLeftFileBody, diffRightFileBody }) => {
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

  return <div id="diff" />
}

export default Diff

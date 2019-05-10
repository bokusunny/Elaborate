import React, { Fragment } from 'react'
import * as H from 'history'
import { ReduxAPIStruct } from '../../../common/static-types/api-struct'
import { FirebaseSnapShot } from '../../../utils/firebase'
import Header from '../../molecules/Header'

interface Props {
  currentUser: firebase.User
  directories: ReduxAPIStruct<FirebaseSnapShot[]>
  selectedDirectoryIdForDiff: string | null
  history: H.History
}

const DiffTemplate: React.FC<Props> = ({
  currentUser,
  directories,
  selectedDirectoryIdForDiff,
  history,
}) => {
  console.log(currentUser, directories, selectedDirectoryIdForDiff)
  return (
    <Fragment>
      <Header colorType="whiteBase" pageType="diff" history={history} />
      <div>Diff Page</div>
    </Fragment>
  )
}

export default DiffTemplate

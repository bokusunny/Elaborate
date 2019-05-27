import React, { Fragment } from 'react'
import { FirebaseSnapShot } from '../../../utils/firebase'
import * as H from 'history'
import Header from '../../organisms/Header'
import MyPageList from '../../organisms/MyPageList'
import { ReduxAPIStruct } from '../../../common/static-types/api-struct'
import * as styles from './style.css'

interface Props {
  currentUser: firebase.User
  directories: ReduxAPIStruct<FirebaseSnapShot[]>
  branches: ReduxAPIStruct<FirebaseSnapShot[]>
  selectedDirectoryId: string | null
  history: H.History
}

const MyPageTemplate: React.FC<Props> = ({
  currentUser,
  directories,
  branches,
  selectedDirectoryId,
  history,
}) => {
  // TODO: branchesのstatusがdefaultの時はBranchListを渡さないで、ディレクトリが選択されていませんみたいなUIを組む
  return (
    <Fragment>
      <Header colorType="whiteBase" pageType="myPage" history={history} />
      <div className={styles.container}>
        <MyPageList
          currentUser={currentUser}
          directories={directories}
          branches={branches}
          selectedDirectoryId={selectedDirectoryId}
        />
      </div>
    </Fragment>
  )
}

export default MyPageTemplate

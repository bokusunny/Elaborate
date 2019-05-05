import React, { Fragment, useState } from 'react'
import { FirebaseSnapShot } from '../../../utils/firebase'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Modal from '@material-ui/core/Modal'
import DirectoryForm from '../../molecules/Forms/DirectoryForm'
import Header from '../../molecules/Header'
import MyPageList from '../../organisms/MyPageList'
import { ReduxAPIStruct } from '../../../reducers/static-types'
import * as styles from './style.css'

interface Props {
  currentUser: firebase.User
  directories: ReduxAPIStruct<FirebaseSnapShot[]>
  branches: ReduxAPIStruct<FirebaseSnapShot[]>
}

const MyPageTemplate: React.FC<Props> = ({ currentUser, directories, branches }) => {
  const [isModalOpen, setISModalOpen] = useState(false)
  // TODO: branchesのstatusがdefaultの時はBranchListを渡さないで、ディレクトリが選択されていませんみたいなUIを組む

  return (
    <Fragment>
      <Header colorType="whiteBase" />
      <div className={styles.container}>
        <MyPageList currentUser={currentUser} directories={directories} branches={branches} />
        <Fab size="medium" color="primary" aria-label="Add" onClick={() => setISModalOpen(true)}>
          <AddIcon />
        </Fab>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={isModalOpen}
          onClose={() => setISModalOpen(false)}
        >
          <div className={styles.modal}>
            <DirectoryForm currentUser={currentUser} onSubmit={() => setISModalOpen(false)} />
          </div>
        </Modal>
      </div>
    </Fragment>
  )
}

export default MyPageTemplate

import React, { useState } from 'react'
import { FirebaseSnapShot } from '../../../utils/firebase'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Modal from '@material-ui/core/Modal'
import DirectoryList from '../../molecules/Lists/DirectoryList'
import DirectoryForm from '../../molecules/Forms/DirectoryForm'
import Header from '../../molecules/Header'
import { ReduxAPIStruct } from '../../../reducers/static-types'
import * as styles from './style.css'

interface Props {
  currentUser: firebase.User
  directories: ReduxAPIStruct<FirebaseSnapShot[]>
}

const MyPageTemplate: React.FC<Props> = ({ currentUser, directories }) => {
  const [isModalOpen, setISModalOpen] = useState(false)

  return (
    <div className={styles.background}>
      <Header colorType="whiteBase" />
      <div className={styles.container}>
        <DirectoryList directories={directories} />
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
    </div>
  )
}

export default MyPageTemplate

import React, { useState } from 'react'
import { auth, FirebaseSnapShot } from '../../../utils/firebase'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import DirectoryList from '../../molecules/Lists/DirectoryList'
import DirectoryForm from '../../molecules/Forms/DirectoryForm'
import { ReduxAPIStruct } from '../../../reducers/static-types'
import * as styles from './style.css'

interface Props {
  currentUser: firebase.User
  directories: ReduxAPIStruct<FirebaseSnapShot[]>
}

const onClickSignOut = () => {
  auth.signOut()
}

const MyPageTemplate: React.FC<Props> = ({ currentUser, directories }) => {
  const [isModalOpen, setISModalOpen] = useState(false)

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <Typography variant="h6">Click your directories to update documents.</Typography>
        <DirectoryList directories={directories} />
        <Fab size="medium" color="primary" aria-label="Add" onClick={() => setISModalOpen(true)}>
          <AddIcon />
        </Fab>
        <button onClick={onClickSignOut}>Sign out</button>
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

import React, { useState } from 'react'
import { auth, FirebaseSnapShot } from '../../../utils/firebase'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import TextField from '@material-ui/core/TextField'
import DirectoryList from '../../molecules/DirectoryList'
import { ReduxAPIStruct } from '../../../reducers/static-types'
import * as styles from './style.css'

interface Props {
  directories: ReduxAPIStruct<FirebaseSnapShot[]>
}

const onClickSignOut = () => {
  auth.signOut()
}

const MyPageTemplate: React.FC<Props> = ({ directories }) => {
  const [isModalOpen, setISModalOpen] = useState(true)

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
            <Typography variant="h6">New Directory</Typography>
            <TextField label="Directory name" defaultValue="" margin="normal" />
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default MyPageTemplate

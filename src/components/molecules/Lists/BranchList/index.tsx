import React, { Fragment } from 'react'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import BranchListItem from '../../../atoms/ListItems/BranchListItem'
import BranchFormWithAddIcon from '../../FormWithButton/BranchFormWithAddIcon'
import { FirebaseSnapShot } from '../../../../utils/firebase'
import { ReduxAPIStruct } from '../../../../common/static-types/api-struct'
import * as styles from './style.css'

interface Props {
  branches: ReduxAPIStruct<FirebaseSnapShot[]>
  currentUser: firebase.User
  selectedDirectoryId: string | null
}

const BranchList: React.FC<Props> = ({ branches, currentUser, selectedDirectoryId }) => {
  if (selectedDirectoryId === null)
    return <div className={styles.message}>No directory is selected ...</div>

  if (branches.status === 'default' || branches.status === 'fetching')
    return <div className={styles.message}>Loading...</div>

  if (branches.status === 'failure')
    return <div className={styles.message}>Error occured: {branches.error.message}</div>

  return (
    <Fragment>
      <List component="nav">
        <Divider />
        {/* ReduxAPIStructの構造上branches.dataはnullになり得ない */}
        {(branches.data as FirebaseSnapShot[]).map(branch => {
          const { id } = branch
          return (
            <Fragment key={id}>
              <BranchListItem
                directoryId={selectedDirectoryId}
                currentBranchId={id}
                branchName={branch.data().name as string}
              />
              <Divider />
            </Fragment>
          )
        })}
      </List>
      <BranchFormWithAddIcon
        currentUser={currentUser}
        directoryId={selectedDirectoryId}
        branches={branches}
      />
    </Fragment>
  )
}

export default BranchList

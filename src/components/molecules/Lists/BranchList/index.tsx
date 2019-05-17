import React, { Fragment } from 'react'
import H from 'history'
import List from '@material-ui/core/List'
import BranchForm from '../../../molecules/Forms/BranchForm'
import BranchListItem from '../../../atoms/ListItems/BranchListItem'
import { FirebaseSnapShot } from '../../../../utils/firebase'
import { ReduxAPIStruct } from '../../../../common/static-types/api-struct'

interface Props {
  branches: ReduxAPIStruct<FirebaseSnapShot[]>
  currentUser: firebase.User
  selectedDirectoryId: string | null
  history: H.History
}

const BranchList: React.FC<Props> = ({ branches, currentUser, selectedDirectoryId, history }) => {
  if (selectedDirectoryId === null) return <div>No directory is selected ...</div>

  if (branches.status === 'default' || branches.status === 'fetching') return <div>Loading...</div>

  if (branches.status === 'failure') return <div>Error occured: {branches.error.message}</div>

  // MEMO：これが出る場合はバグであることに留意
  if (branches.data === null) return <div>Ooops! Some unknown error happened</div>

  return (
    <Fragment>
      <BranchForm currentUser={currentUser} directoryId={selectedDirectoryId} branches={branches} />
      <List component="nav">
        {branches.data.map((branch: FirebaseSnapShot) => {
          const { id } = branch
          const { name } = branch.data()
          return (
            <Fragment key={id}>
              <BranchListItem
                currentUserUid={currentUser.uid}
                directoryId={selectedDirectoryId}
                branchId={id}
                branchName={name}
                history={history}
              />
            </Fragment>
          )
        })}
      </List>
    </Fragment>
  )
}

export default BranchList

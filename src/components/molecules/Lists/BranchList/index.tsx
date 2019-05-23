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

  return (
    <Fragment>
      <BranchForm currentUser={currentUser} directoryId={selectedDirectoryId} branches={branches} />
      <List component="nav">
        {/* ReduxAPIStructの構造上branches.dataはnullになり得ない */}
        {(branches.data as FirebaseSnapShot[]).map(branch => {
          const { id } = branch
          const { name, baseBranchId } = branch.data()
          return (
            <Fragment key={id}>
              <BranchListItem
                currentUserUid={currentUser.uid}
                directoryId={selectedDirectoryId}
                currentBranchId={id}
                baseBranchId={baseBranchId as string}
                branchName={name as string}
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

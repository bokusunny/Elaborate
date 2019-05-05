import React from 'react'
import List from '@material-ui/core/List'
import BranchListItem from '../../../atoms/ListItems/BranchListItem'
import { FirebaseSnapShot } from '../../../../utils/firebase'
import { ReduxAPIStruct } from '../../../../reducers/static-types'

interface Props {
  branches: ReduxAPIStruct<FirebaseSnapShot[]>
}

const BranchList: React.FC<Props> = ({ branches }) => {
  if (branches.status === 'default' || branches.data === null) {
    return <div>No directory is selected ...</div>
  }

  if (branches.status === 'fetching' || branches.data === null) {
    return <div>Loading...</div>
  }

  if (branches.status === 'failure') {
    return <div>Error occured: {branches.error.message}</div>
  }

  return (
    <div>
      <List component="nav">
        {branches.data.map((branch: FirebaseSnapShot) => {
          const { id } = branch
          const { name } = branch.data()
          return (
            <div key={id}>
              <BranchListItem label={name} />
            </div>
          )
        })}
      </List>
    </div>
  )
}

export default BranchList

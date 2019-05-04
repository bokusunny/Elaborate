import React, { useEffect, Fragment } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import { checkDirectoryId } from '../../../actions/directories'
import { ReduxAPIStruct } from '../../../reducers/static-types'
import { FirebaseSnapShot } from '../../../utils/firebase'
import BranchForm from '../../molecules/Forms/BranchForm'

interface MatchParams {
  directoryId: string
}

interface Props extends RouteComponentProps<MatchParams> {
  currentUser: firebase.User | null
  checkDirectoryId: (currentUserUid: string, directoryId: string) => void
}

interface StateProps {
  isValidDirectory: ReduxAPIStruct<boolean>
  branches: ReduxAPIStruct<FirebaseSnapShot[]>
}

const DirectoryPage: React.FC<Props & StateProps> = ({
  match,
  currentUser,
  isValidDirectory,
  branches,
  checkDirectoryId,
}) => {
  if (!currentUser) return <CircularProgress />

  const {
    params: { directoryId },
  } = match

  useEffect(() => checkDirectoryId(currentUser.uid, directoryId), [])

  if (
    isValidDirectory.status === 'default' ||
    isValidDirectory.status === 'fetching' ||
    !branches.data
  ) {
    return <CircularProgress />
  }

  if (!isValidDirectory.data) return <h2>404 Not Found</h2>

  return (
    <Fragment>
      <p>This is directory page.</p>
      <p>
        ID: {directoryId}, {branches.data.length} branch(es).
      </p>
      <ol>
        {branches.data.map((querySnapShot: FirebaseSnapShot, index) => (
          <li key={index}>{querySnapShot.data().name}</li>
        ))}
      </ol>
      <BranchForm directoryId={directoryId} currentUser={currentUser} />
    </Fragment>
  )
}

export default connect(
  ({ isValidDirectory, branches }: StateProps) => ({
    isValidDirectory,
    branches,
  }),
  { checkDirectoryId }
)(DirectoryPage)

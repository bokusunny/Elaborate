import React, { /*useEffect,*/ Fragment } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, Link } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
// import { checkDirectoryId } from '../../../actions/directories'
import { ReduxAPIStruct } from '../../../common/static-types/api-struct'
import { FirebaseSnapShot } from '../../../utils/firebase'
// import BranchForm from '../../molecules/Forms/BranchForm'

interface MatchParams {
  directoryId: string
}

interface Props extends RouteComponentProps<MatchParams> {
  currentUser: firebase.User | null
  // checkDirectoryId: (currentUserUid: string, directoryId: string) => void
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
  // checkDirectoryId,
}) => {
  if (!currentUser) return <CircularProgress />

  const {
    params: { directoryId },
  } = match

  // useEffect(() => checkDirectoryId(currentUser.uid, directoryId), [])

  if (
    isValidDirectory.status === 'default' ||
    isValidDirectory.status === 'fetching' ||
    branches.status === 'default' ||
    branches.status === 'fetching'
  ) {
    return <CircularProgress />
  }

  if (!isValidDirectory.data) return <h2>404 Not Found</h2>

  return (
    <Fragment>
      <p>This is directory page.</p>
      <p>
        {/* ReduxAPIStructの構造上branches.dataはnullになり得ない */}
        ID: {directoryId}, {(branches.data as FirebaseSnapShot[]).length} branch(es).
      </p>
      <ol>
        {/* ReduxAPIStructの構造上branches.dataはnullになり得ない */}
        {(branches.data as FirebaseSnapShot[]).map((querySnapShot: FirebaseSnapShot, index) => (
          <li key={index}>
            {querySnapShot.data().name}
            <Link to={`/${directoryId}/${querySnapShot.id}/edit`}>edit</Link>
          </li>
        ))}
      </ol>
      {/* <BranchForm directoryId={directoryId} currentUser={currentUser} branches={branches} /> */}
    </Fragment>
  )
}

export default connect(
  ({ isValidDirectory, branches }: StateProps) => ({
    isValidDirectory,
    branches,
  }),
  // { checkDirectoryId }
  null
)(DirectoryPage)

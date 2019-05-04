import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import { checkDirectoryId } from '../../../actions/directories'
import { ReduxAPIStruct } from '../../../reducers/static-types'
import EditorTemplate from '../../templates/EditorTemplate'

interface MatchParams {
  directoryId: string
  branchId: string
}

interface Props extends RouteComponentProps<MatchParams> {
  currentUser: firebase.User
}

interface StateProps {
  isValidDirectory: ReduxAPIStruct<boolean>
}

interface DispatchProps {
  checkDirectoryId: (currentUserUid: string, directoryId: string) => void
}

const EditorPage: React.FC<Props & StateProps & DispatchProps> = ({
  currentUser,
  match,
  isValidDirectory,
  checkDirectoryId,
}) => {
  if (!currentUser) return <CircularProgress />

  const {
    params: { directoryId },
  } = match

  useEffect(() => {
    checkDirectoryId(currentUser.uid, directoryId)
  }, [])

  if (isValidDirectory.status === 'default' || isValidDirectory.status === 'fetching') {
    return <CircularProgress />
  }

  if (!isValidDirectory.data) return <h2>404 Not Found</h2>

  return <EditorTemplate />
}

export default connect(
  ({ isValidDirectory }: StateProps) => ({ isValidDirectory }),
  { checkDirectoryId }
)(EditorPage)

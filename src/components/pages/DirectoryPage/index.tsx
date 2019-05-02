import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'
import { checkDirectoryId } from '../../../actions/directories'
import { ReduxAPIStruct } from '../../../reducers/static-types'

interface MatchParams {
  directoryId: string
}

interface Props extends RouteComponentProps<MatchParams> {
  currentUser: firebase.User | null
  isValidDirectory: ReduxAPIStruct<boolean>
  checkDirectoryId: (currentUserUid: string, directoryId: string) => void
}

const DirectoryPage: React.FC<Props> = ({
  match,
  currentUser,
  isValidDirectory,
  checkDirectoryId,
}) => {
  if (!currentUser) return <CircularProgress />

  const currentUserUid = currentUser.uid
  const {
    params: { directoryId },
  } = match

  useEffect(() => checkDirectoryId(currentUserUid, directoryId), [])

  if (isValidDirectory.status === 'default' || isValidDirectory.status === 'fetching') {
    return <CircularProgress />
  }

  if (!isValidDirectory.data) return <h2>404 Not Found</h2>

  return (
    <h3>
      This is directory page.
      <br />
      Directory id is {directoryId}, {"isn't"} it?
    </h3>
  )
}

export default connect(
  ({ isValidDirectory }: Record<string, ReduxAPIStruct<boolean>>) => ({
    isValidDirectory,
  }),
  { checkDirectoryId }
)(DirectoryPage)

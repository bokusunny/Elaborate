import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

interface MatchParams {
  directoryId: string
}

interface Props extends RouteComponentProps<MatchParams> {
  currentUser: firebase.User
}

const DirectoryPage: React.FC<Props> = ({ match }) => {
  const {
    params: { directoryId },
  } = match

  return (
    <h3>
      This is directory page.
      <br />
      Directory id is {directoryId}, {"isn't"} it?
    </h3>
  )
}

export default DirectoryPage

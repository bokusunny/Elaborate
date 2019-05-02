import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

interface MatchParams {
  directoryName: string
}

interface Props extends RouteComponentProps<MatchParams> {
  currentUser: firebase.User
}

const DirectoryPage: React.FC<Props> = props => {
  return (
    <h3>
      This is directory page.
      <br />
      Directory name is {props.match.params.directoryName}, {"isn't"} it?
    </h3>
  )
}

export default DirectoryPage

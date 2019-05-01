import React from 'react'
import { ConnectedComponentClass } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

interface Props {
  exact: boolean
  path: string
  component: ConnectedComponentClass<React.FC<any>, any>
  currentUser: firebase.User | null
  isAuthorized: boolean
}

const PrivateRoute: React.FC<Props> = ({
  exact,
  path,
  component: Component,
  currentUser,
  isAuthorized,
}) => (
  <Route
    exact={exact}
    path={path}
    render={() =>
      isAuthorized ? <Component currentUser={currentUser} /> : <Redirect to="/sign_in" />
    }
  />
)

export default PrivateRoute

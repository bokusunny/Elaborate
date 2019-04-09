import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { auth } from '../../utils/firebase'

interface Props {
  exact: boolean
  path: string
  component: React.FC
  isAuthorized: boolean
}

const PrivateRoute: React.FC<Props> = ({ exact, path, component: Component, isAuthorized }) => (
  <Route
    exact={exact}
    path={path}
    render={() => (isAuthorized ? <Component /> : <Redirect to="/signin" />)}
  />
)

export default PrivateRoute

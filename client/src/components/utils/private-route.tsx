import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { auth } from '../../utils/firebase'

interface Props {
  exact: boolean
  path: string
  component: React.FC
}

const PrivateRoute: React.FC<Props> = ({ exact, path, component: Component }) => (
  <Route
    exact={exact}
    path={path}
    render={() => (auth.currentUser !== null ? <Component /> : <Redirect to="/signin" />)}
  />
)

export default PrivateRoute

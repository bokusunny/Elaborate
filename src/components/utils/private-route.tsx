import React from 'react'
import Alert from 'react-s-alert'
import { ConnectedComponentClass } from 'react-redux'
import { Route, Redirect, RouteComponentProps } from 'react-router-dom'

interface Props {
  exact: boolean
  path: string
  component: React.FC<any> | ConnectedComponentClass<React.FC<any>, any>
  currentUser: firebase.User | null
  isAuthorized: boolean
}

interface MatchParams {
  [key: string]: string
}

const PrivateRoute: React.FC<Props> = ({
  exact,
  path,
  component: Component,
  currentUser,
  isAuthorized,
}) => {
  if (!isAuthorized) {
    setTimeout(() => {
      Alert.error('You must be logged in to access this page.')
    }, 250)
  }

  return (
    <Route
      exact={exact}
      path={path}
      render={(routerProps: RouteComponentProps<MatchParams>) =>
        isAuthorized ? (
          <Component currentUser={currentUser} {...routerProps} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  )
}

export default PrivateRoute

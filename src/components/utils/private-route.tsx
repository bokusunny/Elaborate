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
    // setTimeoutは0に設定しても30msほど遅延が生じることを利用しredirect前の発火を避ける
    // TODO: いい方法ではないので今後改善したい
    setTimeout(() => {
      Alert.error('You must be logged in to access this page.')
    }, 0)
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

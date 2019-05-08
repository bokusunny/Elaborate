import React from 'react'
import { ConnectedComponentClass } from 'react-redux'
import { Route, Redirect, RouteComponentProps } from 'react-router-dom'

interface Props {
  exact: boolean
  path: string
  component: React.FC<any> | ConnectedComponentClass<React.FC<any>, any>
  isAuthorized: boolean
}

const PublicRoute: React.FC<Props> = ({ exact, path, component: Component, isAuthorized }) => (
  <Route
    exact={exact}
    path={path}
    render={(routerProps: RouteComponentProps) =>
      !isAuthorized ? <Component {...routerProps} /> : <Redirect to="/mypage" />
    }
  />
)

export default PublicRoute

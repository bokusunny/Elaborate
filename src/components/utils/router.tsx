import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { auth } from '../../utils/firebase'
import CircularProgress from '@material-ui/core/CircularProgress'
import PublicRoute from './public-route'
import PrivateRoute from './private-route'
import LandingPage from '../pages/LandingPage'
import MyPage from '../pages/MyPage'
import DirectoryPage from '../pages/DirectoryPage'
import EditorPage from '../pages/EditorPage'
import DiffPage from '../pages/DiffPage'

const Router: React.FC<{}> = () => {
  const [authState, setAuthState] = useState({ isLoading: true, isAuthorized: false })
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null)
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setAuthState({ isLoading: false, isAuthorized: true })
        setCurrentUser(user)
      } else {
        setAuthState({ isLoading: false, isAuthorized: false })
        setCurrentUser(null)
      }
    })
  }, [auth])

  const { isLoading, isAuthorized } = authState

  if (isLoading) return <CircularProgress />

  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute exact path="/" component={LandingPage} isAuthorized={isAuthorized} />
        <PrivateRoute
          exact
          path="/mypage"
          component={MyPage}
          currentUser={currentUser}
          isAuthorized={isAuthorized}
        />
        <PrivateRoute
          exact
          path="/:directoryId"
          component={DirectoryPage}
          currentUser={currentUser}
          isAuthorized={isAuthorized}
        />
        <PrivateRoute
          exact
          // TODO:
          // 現状base branchのIdをbranchが保持していないので暫定的に左側のURLはmaster
          // https://github.com/bokusunny/Elaborate/issues/169 解決後に変更する
          path="/:directoryId/diff/master/:rightBranchId"
          component={DiffPage}
          currentUser={currentUser}
          isAuthorized={isAuthorized}
        />
        <PrivateRoute
          exact
          path="/:directoryId/:branchId/edit"
          component={EditorPage}
          currentUser={currentUser}
          isAuthorized={isAuthorized}
        />
        <Route render={() => <h2>404 Not Found</h2>} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router

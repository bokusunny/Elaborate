import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { auth } from '../../utils/firebase'
import CircularProgress from '@material-ui/core/CircularProgress'
import PublicRoute from './public-route'
import PrivateRoute from './private-route'
import LandingPage from '../pages/LandingPage'
import MyPage from '../pages/MyPage'
import EditorPage from '../pages/EditorPage'

const Router: React.FC<{}> = () => {
  const [authState, setAuthState] = useState({ isLoading: true, isAuthorized: false })
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setAuthState({ isLoading: false, isAuthorized: true })
      } else {
        setAuthState({ isLoading: false, isAuthorized: false })
      }
    })
  }, [auth])

  const { isLoading, isAuthorized } = authState

  if (isLoading) return <CircularProgress />

  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute exact path="/sign_in" component={LandingPage} isAuthorized={isAuthorized} />
        <PrivateRoute exact path="/:username" component={MyPage} isAuthorized={isAuthorized} />
        <Route exact path="/" component={isAuthorized ? MyPage : LandingPage} />
        {/* TODO: It's tmp route, need to make it Private Route & Use uid  */}
        <Route exact path="/:id/edit" component={EditorPage} />
        <Route render={() => <h2>404 Not Found</h2>} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router

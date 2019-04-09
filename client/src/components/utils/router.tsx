import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { auth } from '../../utils/firebase'
import PrivateRoute from './private-route'
import SignInPage from '../pages/SignInPage'
import MyPage from '../pages/MyPage'

const Router = () => {
  const [isAuthorizing, setIsAuthorizing] = useState(true)
  useEffect(() => {
    auth.onAuthStateChanged(() => setIsAuthorizing(false))
  }, [auth])

  if (isAuthorizing) return <div>Authorizing...</div>

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/signin" component={SignInPage} />
        <PrivateRoute exact path="/:userId" component={MyPage} />
        <Route render={() => <h2>404 Not Found</h2>} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router

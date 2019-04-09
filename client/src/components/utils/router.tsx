import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { auth } from '../../utils/firebase'
import SignInPage from '../pages/SignInPage'
import MyPage from '../pages/MyPage'

const Router = () => {
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

  if (authState.isLoading) return <div>Loading...</div>
  console.log(auth.currentUser)

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/signin" component={SignInPage} />
        <Route exact path="/:userId" component={MyPage} />
        <Route render={() => <h2>404 Not Found</h2>} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router

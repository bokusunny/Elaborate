import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import firebase from '../../utils/firebase'
import SignInPage from '../pages/SignInPage'
import MyPage from '../pages/MyPage'

type User = firebase.User | null

const Router = () => {
  const [currentUser, setCurrentUser] = useState<User>(null)
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setCurrentUser(user)
      console.log(currentUser)
    })
  })

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

import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import firebase from '../../utils/firebase'

interface Props {
  children: JSX.Element
}

type User = firebase.User | null

const Auth: React.SFC<Props> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User>(null)
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setCurrentUser(user)
      console.log(currentUser)
    })
  })

  return currentUser ? children : <Redirect to="/signin" />
}

export default Auth

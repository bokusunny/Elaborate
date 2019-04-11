import React, { Fragment } from 'react'
import { auth } from '../../../utils/firebase'

const onClickSignOut = () => {
  auth.signOut()
}

const MyPageTemplate: React.FC<{}> = () => (
  <Fragment>
    <div>Hello, {auth.currentUser && auth.currentUser.email}👋</div>
    <div>This page guarantees that you are authorized!</div>
    <button onClick={onClickSignOut}>Sign out</button>
  </Fragment>
)

export default MyPageTemplate

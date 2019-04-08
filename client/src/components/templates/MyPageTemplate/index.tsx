import React, { Fragment } from 'react'
import firebase from '../../../utils/firebase'

const onClickSignOut = () => {
  firebase.auth().signOut()
}

const MyPageTemplate: React.FC<{}> = () => (
  <Fragment>
    <div>Hello, MyPage!</div>
    <button onClick={onClickSignOut}>Sign out</button>
  </Fragment>
)

export default MyPageTemplate

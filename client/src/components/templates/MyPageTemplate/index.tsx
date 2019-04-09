import React, { Fragment } from 'react'
import { auth } from '../../../utils/firebase'

const onClickSignOut = () => {
  auth.signOut()
}

const MyPageTemplate: React.FC<{}> = () => (
  <Fragment>
    <div>Hello, MyPage!</div>
    <button onClick={onClickSignOut}>Sign out</button>
  </Fragment>
)

export default MyPageTemplate

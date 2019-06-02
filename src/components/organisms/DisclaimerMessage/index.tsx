import React from 'react'
import * as styles from './style.css'
const { disclaimerMessageWrapper, logo, pc, pcWrapper, disclaimerMessage } = styles

const DisclaimerMessage: React.FC = () => (
  <div className={disclaimerMessageWrapper}>
    <h1 className={logo}>Elaborate</h1>
    <div className={pcWrapper}>
      <img
        className={pc}
        src="https://firebasestorage.googleapis.com/v0/b/elaborate.appspot.com/o/pc.png?alt=media&token=0c961d6c-9b95-44d6-99f5-9f2ecb6e5622"
      />
    </div>
    <div>
      <p className={disclaimerMessage}>
        Elaborate is not offered on smartphones and tablets at the current version.
      </p>
      <p className={disclaimerMessage}>
        Visit Elaborate again on a PC to start “elaborate” your documents.
      </p>
    </div>
  </div>
)

export default DisclaimerMessage

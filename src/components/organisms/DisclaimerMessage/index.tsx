import React from 'react'
import * as styles from './style.css'

const { disclaimerMessageWrapper, logo, pc, pcWrapper, disclaimerMessage } = styles

const DisclaimerMessage: React.FC = () => (
  <div className={disclaimerMessageWrapper}>
    <h1 className={logo}>Elaborate</h1>
    <div className={pcWrapper}>
      <img className={pc} src="https://elabor-8.com/src/img/pc.png" />
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

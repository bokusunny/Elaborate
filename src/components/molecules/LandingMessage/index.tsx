import React from 'react'
import * as styles from './style.css'

// MEMO: 本来moleculesではデータを持たない、このコンポーネントは他に使いどころがないので静的情報も保持。(YMZK)

const title = 'Let you be\nmore creative.'
const message = `
  We believe words of wisdom are always created after deep deliberations.\n
  Who’s heart do you like to move with Elaborate?\n
  This is a creative workspace for you to "elaborate" your message.
`

const { messageWrapper, catchCopy, catchCopyText, description, descriptionText } = styles

const LandingMesage = () => (
  <div className={messageWrapper}>
    <div className={catchCopy}>
      {title.split('\n').map((text, index) => {
        return (
          <p className={catchCopyText} key={index}>
            {text}
          </p>
        )
      })}
    </div>
    <div className={description}>
      {message.split('\n').map((text, index) => {
        return (
          <p className={descriptionText} key={index}>
            {text}
          </p>
        )
      })}
    </div>
  </div>
)

export default LandingMesage

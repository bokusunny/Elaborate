import React from 'react'
import * as styles from './style.css'

// MEMO: 本来moleculesではデータを持たないが、このコンポーネントは他に使いどころがないので静的情報をコンポーネント内で保持。(YMZK)

const title = 'Creative work space\n to elaborate your ideas.'
const message = `
Who’s heart do you want to move by your words?\n
All you need is just start writing and think through until having it enough.\n
We offer a simply designed editor and a version controlling system.\n
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

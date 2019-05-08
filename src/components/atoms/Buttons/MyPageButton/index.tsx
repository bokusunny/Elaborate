import React from 'react'
import classNames from 'classnames'
import * as styles from './style.css'

interface Props {
  colorType: 'blueBase' | 'whiteBase'
  onClick: () => void
}

const MyPageButton: React.FC<Props> = ({ colorType, onClick }) => {
  const btnClass = classNames(styles.button, styles[colorType])

  return (
    <div className={btnClass} onClick={onClick}>
      MyPage
    </div>
  )
}

export default MyPageButton

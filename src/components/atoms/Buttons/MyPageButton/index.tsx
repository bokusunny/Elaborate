import React from 'react'
import * as styles from './style.css'

interface Props {
  colorType: 'blueBase' | 'whiteBase'
  onClick: () => void
}

const MyPageButton: React.FC<Props> = ({ colorType, onClick }) => {
  return (
    <div className={`${styles.button} ${styles[colorType]}`} onClick={onClick}>
      MyPage
    </div>
  )
}

export default MyPageButton

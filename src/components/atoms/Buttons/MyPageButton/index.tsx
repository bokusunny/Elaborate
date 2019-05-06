import React from 'react'
import * as styles from './style.css'

interface Props {
  colorType: 'blueBase' | 'whiteBase'
  onClick: () => void
}

const MyPageButton: React.FC<Props> = ({ colorType, onClick }) => {
  const { MyPageButtonBlueBase, MyPageButtonWhiteBase } = styles
  return (
    <div
      className={colorType === 'blueBase' ? MyPageButtonBlueBase : MyPageButtonWhiteBase}
      onClick={onClick}
    >
      MyPage
    </div>
  )
}

export default MyPageButton

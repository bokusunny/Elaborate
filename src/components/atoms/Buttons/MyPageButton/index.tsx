import React from 'react'
import * as styles from './style.css'
const { MyPageButtonBlueBase, MyPageButtonWhiteBase } = styles

interface Props {
  colorType: 'blueBase' | 'whiteBase'
  onClick: () => void
}

const MyPageButton: React.FC<Props> = ({ colorType, onClick }) => {
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

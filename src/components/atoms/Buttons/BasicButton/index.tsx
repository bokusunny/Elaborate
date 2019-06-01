import React from 'react'
import * as styles from './style.css'
const { button } = styles

interface Props {
  children: React.ReactNode
  colorType?: 'blueBase' | 'whiteBase' | 'whiteBaseWithBorder'
  className?: 'title' | 'signOut' | 'commit' | 'checkDiff' | 'auth'
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const BasicButton: React.FC<Props> = ({ children, colorType, className, onClick }) => {
  const colorTypeClass = colorType ? styles[colorType] : ''
  const propsClass = className ? styles[className] : ''

  return (
    <div className={`${button} ${colorTypeClass} ${propsClass}`} onClick={onClick}>
      {children}
    </div>
  )
}

export default BasicButton

import React from 'react'
import * as styles from './style.css'

interface Props {
  label: string
  onToggle: (displayStyle: string) => void
  style: string
}

const StyleButton: React.FC<Props> = ({ label, onToggle, style }) => {
  const { styleButton } = styles

  const OnToggle = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault()
    onToggle(style)
  }

  return (
    <span onMouseDown={OnToggle} className={styleButton}>
      {label}
    </span>
  )
}

export default StyleButton

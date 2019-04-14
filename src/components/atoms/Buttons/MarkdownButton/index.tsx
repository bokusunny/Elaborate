import React from 'react'

interface Props {
  label: string
  onToggle: (displayStyle: string) => void
  style: string
}

const StyleButton: React.FC<Props> = ({ label, onToggle, style }) => {
  const OnToggle = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    e.preventDefault()
    onToggle(style)
  }

  return <span onMouseDown={OnToggle}>{label}</span>
}

export default StyleButton

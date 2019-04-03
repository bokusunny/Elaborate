import React from 'react'

interface Props {
  onClick: () => void
  children: string
}

const Button: React.FC<Props> = ({ onClick, children }) => (
  <button onClick={onClick}>{children}</button>
)

export default Button

import React from 'react'
import * as styles from './style.css'

interface Props {
  children: string
  colorType: 'blueBase' | 'whiteBase'
  onClick: () => void
}

const BasicButton: React.FC<Props> = ({ children, colorType, onClick }) => (
  <div className={styles[colorType]} onClick={onClick}>
    {children}
  </div>
)

export default BasicButton

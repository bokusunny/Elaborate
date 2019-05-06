import React from 'react'
import * as styles from './style.css'

interface Props {
  onClick: () => void
}

const HeaderTitleButton: React.FC<Props> = ({ onClick }) => (
  <div className={styles.title} onClick={onClick}>
    Elaborate
  </div>
)

export default HeaderTitleButton

import React from 'react'
import * as H from 'history'
import * as styles from './style.css'

interface Props {
  history: H.History
}

const HeaderTitleButton: React.FC<Props> = ({ history }) => (
  <div className={styles.title} onClick={() => history.push('/mypage')}>
    Elaborate
  </div>
)

export default HeaderTitleButton

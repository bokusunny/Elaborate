import React from 'react'
import * as H from 'history'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import * as styles from './style.css'

interface Props {
  history: H.History
  pageType: 'landing' | 'myPage' | 'edit' | 'diff'
}

const HeaderTitleButton: React.FC<Props> = ({ history, pageType }) => (
  <div className={styles.title} onClick={() => history.push('/mypage')}>
    {pageType === 'edit' ? <FontAwesomeIcon icon={faHome} /> : 'Elaborate'}
  </div>
)

export default HeaderTitleButton

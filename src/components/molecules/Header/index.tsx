import React from 'react'
import * as H from 'history'
import { auth } from '../../../utils/firebase'
import { connect } from 'react-redux'
import classNames from 'classnames'
import HeaderRight from '../HeaderRight'
import HeaderTitleButton from '../../atoms/Buttons/HeaderTitleButton'
import AuthButtons from '../../atoms/Buttons/AuthButtons'
import { AuthenticationModalOpen } from '../../../actions/modals'
import * as styles from './style.css'

type History = H.History

interface Props {
  colorType: 'blueBase' | 'whiteBase'
  pageType: 'landing' | 'myPage' | 'edit'
  history: History
}

const onClickSignOut = () => {
  auth.signOut()
}

const Header: React.FC<Props> = ({ colorType, pageType, history }) => {
  const headerClass = classNames(styles.header, styles[colorType])

  return colorType === 'blueBase' ? (
    <div className={headerClass}>
      <HeaderTitleButton history={history} />
      <AuthButtons />
    </div>
  ) : (
    <div className={headerClass}>
      <HeaderTitleButton history={history} />
      <HeaderRight
        colorType="whiteBase"
        pageType={pageType}
        onClickSignOut={onClickSignOut}
        history={history}
      />
    </div>
  )
}

export default connect(
  null,
  { AuthenticationModalOpen }
)(Header)

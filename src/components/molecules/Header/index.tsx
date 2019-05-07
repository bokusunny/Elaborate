import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import * as H from 'history'
import { auth } from '../../../utils/firebase'
import { connect } from 'react-redux'
import HeaderRight from '../HeaderRight'
import HeaderTitleButton from '../../atoms/Buttons/HeaderTitleButton'
import AuthButtons from '../../atoms/Buttons/AuthButtons'
import { AuthenticationModalOpen } from '../../../actions/modals'
import * as styles from './style.css'

const { HeaderBlueBase, HeaderWhiteBase } = styles

type History = H.History

interface Props extends RouteComponentProps {
  colorType: 'blueBase' | 'whiteBase'
  pageType: 'landing' | 'myPage' | 'edit'
  history: History
}

const onClickSignOut = () => {
  auth.signOut()
}

const onClickToMyPage = (history: History) => {
  history.push('/MyPage')
}

const Header: React.FC<Props> = ({ colorType, pageType, history }) => {
  return colorType === 'blueBase' ? (
    <div className={HeaderBlueBase}>
      <HeaderTitleButton onClick={() => onClickToMyPage(history)} />
      <AuthButtons />
    </div>
  ) : (
    <div className={HeaderWhiteBase}>
      <HeaderTitleButton onClick={() => onClickToMyPage(history)} />
      <HeaderRight
        colorType="whiteBase"
        pageType={pageType}
        onClickSignOut={onClickSignOut}
        onClickToMyPage={() => onClickToMyPage(history)}
      />
    </div>
  )
}

export default withRouter(
  connect(
    null,
    { AuthenticationModalOpen }
  )(Header)
)

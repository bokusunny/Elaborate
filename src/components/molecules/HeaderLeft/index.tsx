import React from 'react'
import * as H from 'history'
import HeaderTitleButton from '../../atoms/Buttons/HeaderTitleButton'

interface Props {
  history: H.History
}

const HeaderLeft: React.FC<Props> = props => <HeaderTitleButton {...props} />

export default HeaderLeft

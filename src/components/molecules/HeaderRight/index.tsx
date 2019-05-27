import React from 'react'
import { auth } from '../../../utils/firebase'
import AuthButtons from '../../molecules/AuthButtons'
import BasicButton from '../../atoms/Buttons/BasicButton'

interface Props {
  colorType: 'blueBase' | 'whiteBase'
  pageType: 'landing' | 'myPage' | 'edit' | 'diff'
}

const HeaderRight: React.FC<Props> = ({ colorType, pageType }) => {
  switch (pageType) {
    case 'landing':
      return <AuthButtons />

    case 'myPage':
      return (
        <BasicButton colorType={colorType} onClick={() => auth.signOut()}>
          Sign out
        </BasicButton>
      )

    case 'edit':
    case 'diff':
      return null
  }
  return <div>Sorry, something went wrong... Please reload.</div>
}

export default HeaderRight

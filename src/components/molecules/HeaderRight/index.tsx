import React from 'react'
import Alert from 'react-s-alert'
import { auth } from '../../../utils/firebase'
import AuthButtons from '../../molecules/AuthButtons'
import BasicButton from '../../atoms/Buttons/BasicButton'
import { OpenModalType } from '../../../common/static-types'

interface Props {
  colorType: 'blueBase' | 'whiteBase'
  pageType: 'landing' | 'myPage' | 'edit' | 'diff'
  handleModalOpen?: React.Dispatch<React.SetStateAction<OpenModalType>>
}

const onClickSignOut = () => {
  auth.signOut().then(() => {
    localStorage.removeItem('elaborate-jwt')
    Alert.success('Successfully signed out.')
  })
}

const HeaderRight: React.FC<Props> = ({ colorType, pageType, handleModalOpen }) => {
  switch (pageType) {
    case 'landing':
      return (
        <AuthButtons
          handleModalOpen={handleModalOpen as React.Dispatch<React.SetStateAction<OpenModalType>>}
        />
      )

    case 'myPage':
      return (
        <BasicButton colorType={colorType} className="signOut" onClick={onClickSignOut}>
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

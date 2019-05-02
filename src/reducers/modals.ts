import { actionTypes } from '../constants'
import { AuthenticationModalsAction } from '../actions/modals'

export interface AuthenticationModal {
  isAuthModalOpen: boolean
  authenticationType?: 'Sign in' | 'Sign up'
}

const INITIAL_STATE: AuthenticationModal = {
  isAuthModalOpen: false,
  authenticationType: 'Sign up',
}

export const authenticationModals = (
  state: AuthenticationModal = INITIAL_STATE,
  action: AuthenticationModalsAction
): AuthenticationModal => {
  switch (action.type) {
    case actionTypes.MODAL_AUTHENTICATION_OPEN:
      return {
        isAuthModalOpen: true,
        authenticationType: action.payload.authenticationType,
      }
    case actionTypes.MODAL_AUTHENTICATION_CLOSE:
      return { isAuthModalOpen: false }
  }
  return state
}

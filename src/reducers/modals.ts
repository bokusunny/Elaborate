import { actionTypes } from '../constants'
import { AuthenticationModalsAction } from '../actions/modals'

export interface AuthenticationModal {
  isAuthModalOpen: boolean
  authenticationType?: 'Sign in' | 'Sign up'
}

const INITIAL_STATE: AuthenticationModal = {
  isAuthModalOpen: false,
  authenticationType: undefined,
}

export const authenticationModals = (
  state: AuthenticationModal = INITIAL_STATE,
  action: AuthenticationModalsAction
): AuthenticationModal => {
  switch (action.type) {
    case actionTypes.MODAL__AUTHENTICATION_OPEN:
      return {
        isAuthModalOpen: true,
        authenticationType: action.payload.authenticationType,
      }
    case actionTypes.MODAL__AUTHENTICATION_CLOSE:
      return { isAuthModalOpen: false }
  }
  return state
}

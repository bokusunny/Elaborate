import { actionTypes } from '../constants'
import { AuthenticationsAction } from '../actions/authentications'

export interface Authentication {
  isModalOpen: boolean
  authenticationType?: 'Sign in' | 'Sign up'
}

const INITIAL_STATE: Authentication = {
  isModalOpen: false,
  authenticationType: 'Sign up',
}

export const authentications = (
  state: Authentication = INITIAL_STATE,
  action: AuthenticationsAction
): Authentication => {
  switch (action.type) {
    case actionTypes.AUTHENTICATION_SET_IS_MODAL_OPEN:
      return {
        isModalOpen: action.payload.isModalOpen,
        authenticationType: action.payload.authenticationType,
      }
  }
  return state
}

import { ThunkDispatch } from 'redux-thunk'
import { actionTypes } from '../constants'
import { BaseAction } from './static-types'

interface AuthenticationModalOpenAction extends BaseAction {
  type: string
  payload: { authenticationType: 'Sign in' | 'Sign up' }
}

interface AuthenticationModalCloseAction extends BaseAction {
  type: string
}

export type AuthenticationModalsAction =
  | AuthenticationModalOpenAction
  | AuthenticationModalCloseAction

export const AuthenticatoinModalOpen = (authenticationType: 'Sign in' | 'Sign up') => {
  return (dispatch: ThunkDispatch<{}, {}, AuthenticationModalOpenAction>) => {
    dispatch({
      type: actionTypes.MODAL_AUTHENTICATION_OPEN,
      payload: { authenticationType },
    })
  }
}

export const AuthenticationModalClose = () => {
  return (dispatch: ThunkDispatch<{}, {}, AuthenticationModalCloseAction>) => {
    dispatch({ type: actionTypes.MODAL_AUTHENTICATION_CLOSE })
  }
}

import { ThunkDispatch } from 'redux-thunk'
import { actionTypes } from '../common/constants/action-types'
import { BaseAction } from '../common/static-types/actions'

interface AuthenticationModalOpenAction extends BaseAction {
  type: string
  payload: 'Sign in' | 'Sign up'
}

interface AuthenticationModalCloseAction extends BaseAction {
  type: string
  payload: null
}

export type AuthenticationModalsAction =
  | AuthenticationModalOpenAction
  | AuthenticationModalCloseAction

export const AuthenticationModalOpen = (authenticationType: 'Sign in' | 'Sign up') => {
  return (dispatch: ThunkDispatch<{}, {}, AuthenticationModalOpenAction>) => {
    dispatch({
      type: actionTypes.MODAL__AUTHENTICATION_OPEN,
      payload: authenticationType,
    })
  }
}

export const AuthenticationModalClose = () => {
  return (dispatch: ThunkDispatch<{}, {}, AuthenticationModalCloseAction>) => {
    dispatch({
      type: actionTypes.MODAL__AUTHENTICATION_CLOSE,
      payload: null,
    })
  }
}

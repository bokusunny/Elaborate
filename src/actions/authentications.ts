import { ThunkDispatch } from 'redux-thunk'
import { actionTypes } from '../constants'
import { BaseAction } from './static-types'

interface SetIsModalOpenAction extends BaseAction {
  type: string
  payload: { isModalOpen: boolean }
}

export type AuthenticationsAction = SetIsModalOpenAction

export const setIsModalOpen = (isModalOpen: boolean) => {
  return (dispatch: ThunkDispatch<{}, {}, SetIsModalOpenAction>) => {
    dispatch({
      type: actionTypes.AUTHENTICATION_SET_IS_MODAL_OPEN,
      payload: { isModalOpen },
    })
  }
}

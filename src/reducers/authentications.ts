import { actionTypes } from '../constants'
import { AuthenticationsAction } from '../actions/authentications'
import { ReduxIsModalOpen } from './static-types'

const INITIAL_STATE = {
  isModalOpen: false,
}

export const authentications = (
  state = INITIAL_STATE,
  action: AuthenticationsAction
): ReduxIsModalOpen => {
  switch (action.type) {
    case actionTypes.AUTHENTICATION_SET_IS_MODAL_OPEN:
      return { isModalOpen: action.payload.isModalOpen }

    default:
      return state
  }
}

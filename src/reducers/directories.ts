import { actionTypes } from '../constants'
import { ReduxAPIStruct, defaultSet } from './static-types'

export const directories = (
  state: ReduxAPIStruct<any> = defaultSet(),
  action: any
): ReduxAPIStruct<any> => {
  switch (action.type) {
    case actionTypes.DIRECTORY_FIREBASE_REQUEST:
      return { ...state, status: 'fetching' }

    case actionTypes.DIRECTORY_SET:
      if ('directories' in action.payload) {
        return { ...state, status: 'success', data: action.payload.directories }
      }
  }
  return state
}

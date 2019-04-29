import { actionTypes } from '../constants'
import { ReduxAPIStruct, defaultSet } from './static-types'
import { DirectoriesAction } from '../actions/directories'
import { FirebaseSnapShot } from '../utils/firebase'

export const directories = (
  state: ReduxAPIStruct<FirebaseSnapShot[]> = defaultSet(),
  action: DirectoriesAction
): ReduxAPIStruct<FirebaseSnapShot[]> => {
  switch (action.type) {
    case actionTypes.DIRECTORY_FIREBASE_REQUEST:
      return { ...state, status: 'fetching' }

    case actionTypes.DIRECTORY_SET:
      if ('directories' in action.payload) {
        return { ...state, status: 'success', data: action.payload.directories }
      }
      return state

    case actionTypes.DIRECTORY_FIREBASE_REQUEST_FAILURE:
      return { ...state, status: 'failure', error: action.payload.error }
  }
  return state
}

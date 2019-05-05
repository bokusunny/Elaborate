import { actionTypes } from '../constants'
import { ReduxAPIStruct, defaultSet } from './static-types'
import { DirectoriesAction, IsInvalidDirectoryAction } from '../actions/directories'
import { FirebaseSnapShot } from '../utils/firebase'

export const directories = (
  state: ReduxAPIStruct<FirebaseSnapShot[]> = defaultSet(),
  action: DirectoriesAction
): ReduxAPIStruct<FirebaseSnapShot[]> => {
  switch (action.type) {
    case actionTypes.DIRECTORY__FIREBASE_REQUEST:
      return { ...state, status: 'fetching' }

    case actionTypes.DIRECTORY__FIREBASE_REQUEST_FAILURE:
      return { ...state, status: 'failure', error: action.payload.message }

    case actionTypes.DIRECTORY__SET:
      if ('directories' in action.payload) {
        return { ...state, status: 'success', data: action.payload.directories }
      }
      return state

    case actionTypes.DIRECTORY__ADD:
      if ('newDir' in action.payload) {
        if (state.data === null) return state
        return { ...state, status: 'success', data: state.data.concat(action.payload.newDir) }
      }
      return state
  }
  return state
}

export const isValidDirectory = (
  state: ReduxAPIStruct<boolean> = defaultSet(),
  action: IsInvalidDirectoryAction
): ReduxAPIStruct<boolean> => {
  switch (action.type) {
    case actionTypes.DIRECTORY_IS_INVALID__FIREBASE_REQUEST:
      return { ...state, status: 'fetching' }

    case actionTypes.DIRECTORY_IS_INVALID__FIREBASE_REQUEST_FAILURE:
      return { ...state, status: 'failure', error: action.payload.message }

    case actionTypes.DIRECTORY__CHECK_ID:
      return { ...state, status: 'success', data: action.payload.isValidDirectoryId }
  }
  return state
}

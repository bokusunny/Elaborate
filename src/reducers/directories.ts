import { actionTypes } from '../common/constants/action-types'
import { ReduxAPIStruct, defaultSet } from '../common/static-types/api-struct'
import {
  DirectoriesAction,
  IsInvalidDirectoryAction,
  DirectoriesStatusAction,
} from '../actions/directories'
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
    case actionTypes.DIRECTORY_IS_VALID__FIREBASE_REQUEST:
      return { ...state, status: 'fetching' }

    case actionTypes.DIRECTORY_IS_VALID__FIREBASE_REQUEST_FAILURE:
      return { ...state, status: 'failure', error: action.payload.message }

    case actionTypes.DIRECTORY__CHECK_ID:
      return { ...state, status: 'success', data: action.payload.isValidDirectoryId }
  }
  return state
}

export const selectedDirectoryId = (
  state: string | null = null,
  action: DirectoriesStatusAction
): string | null => {
  switch (action.type) {
    case actionTypes.DIRECTORY__SET_SELECTED_DIRECTORY_ID:
      return action.payload.selectedDirectoryId
  }
  return state
}

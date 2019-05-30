import { actionTypes } from '../common/constants/action-types'
import { ReduxAPIStruct, defaultSet } from '../common/static-types/api-struct'
import {
  DirectoriesAction,
  FetchDirectoryAction,
  DirectoriesStatusAction,
  DirectoryData,
} from '../actions/directories'
import { FirebaseSnapShot } from '../utils/firebase'

export const directories = (
  state: ReduxAPIStruct<FirebaseSnapShot[]> = defaultSet(),
  action: DirectoriesAction
): ReduxAPIStruct<FirebaseSnapShot[]> => {
  switch (action.type) {
    case actionTypes.DIRECTORY__FIREBASE_REQUEST:
      if (action.payload !== null) return state
      return { ...state, status: 'fetching' }

    case actionTypes.DIRECTORY__FIREBASE_REQUEST_FAILURE:
      if (action.payload === null || !('message' in action.payload)) return state
      return { ...state, status: 'failure', error: action.payload }

    case actionTypes.DIRECTORY__SET:
      if (action.payload === null || !('directories' in action.payload)) return state
      return { ...state, status: 'success', data: action.payload.directories }

    case actionTypes.DIRECTORY__ADD:
      if (action.payload === null || !('newDir' in action.payload)) return state
      return {
        ...state,
        status: 'success',
        // ReduxAPIStructの構造上state.dataはnullにはなり得ない
        data: [action.payload.newDir].concat(state.data as FirebaseSnapShot[]),
      }
  }
  return state
}

export const currentDirectory = (
  state: ReduxAPIStruct<DirectoryData> = defaultSet(),
  action: FetchDirectoryAction
): ReduxAPIStruct<DirectoryData> => {
  switch (action.type) {
    case actionTypes.DIRECTORY_IS_VALID__FIREBASE_REQUEST:
      if (action.payload !== null) return state
      return { ...state, status: 'fetching' }

    case actionTypes.DIRECTORY_IS_VALID__FIREBASE_REQUEST_FAILURE:
      if (action.payload === null || !('message' in action.payload)) return state
      return { ...state, status: 'failure', error: action.payload }

    case actionTypes.DIRECTORY__CHECK_ID:
      if (action.payload === null || !('isValidDirectoryId' in action.payload)) return state
      return { ...state, status: 'success', data: action.payload }
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

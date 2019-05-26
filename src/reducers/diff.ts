import { actionTypes } from '../common/constants/action-types'
import { ReduxAPIStruct, defaultSet } from '../common/static-types/api-struct'
import { DiffFilesAction } from '../actions/diff'

export interface LeftFile {
  leftFileBody: string | null
  leftFileName: string | null
}

export interface RightFile {
  rightFileBody: string | null
  rightFileName: string | null
}

export const diffLeftFile = (
  state: ReduxAPIStruct<LeftFile> = defaultSet(),
  action: DiffFilesAction
): ReduxAPIStruct<LeftFile> => {
  switch (action.type) {
    case actionTypes.DIFF__FIREBASE_REQUEST:
      if (action.payload !== null) return state
      return { ...state, status: 'fetching' }

    case actionTypes.DIFF__FIREBASE_REQUEST_FAILURE:
      if (action.payload === null || !('message' in action.payload)) return state
      return { ...state, status: 'failure', error: action.payload }

    case actionTypes.DIFF__LEFT_FILE_SET:
      if (
        action.payload === null ||
        !('leftFileBody' in action.payload) ||
        !('leftFileName' in action.payload)
      )
        return state
      return { ...state, status: 'success', data: action.payload }
  }
  return state
}

export const diffRightFile = (
  state: ReduxAPIStruct<RightFile> = defaultSet(),
  action: DiffFilesAction
): ReduxAPIStruct<RightFile> => {
  switch (action.type) {
    case actionTypes.DIFF__FIREBASE_REQUEST:
      if (action.payload !== null) return state
      return { ...state, status: 'fetching' }

    case actionTypes.DIFF__FIREBASE_REQUEST_FAILURE:
      if (action.payload === null || !('message' in action.payload)) return state
      return { ...state, status: 'failure', error: action.payload }

    case actionTypes.DIFF__RIGHT_FILE_SET:
      if (
        action.payload === null ||
        !('rightFileBody' in action.payload) ||
        !('rightFileName' in action.payload)
      )
        return state
      return { ...state, status: 'success', data: action.payload }
  }
  return state
}

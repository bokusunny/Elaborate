import { actionTypes } from '../common/constants/action-types'
import { ReduxAPIStruct, defaultSet } from '../common/static-types/api-struct'
import { DiffFilesAction } from '../actions/diff'

export const diffLeftFile = (
  state: ReduxAPIStruct<string> = defaultSet(),
  action: DiffFilesAction
): ReduxAPIStruct<string> => {
  switch (action.type) {
    case actionTypes.DIFF__FIREBASE_REQUEST:
      return { ...state, status: 'fetching' }

    case actionTypes.DIFF__FIREBASE_REQUEST_FAILURE:
      return { ...state, status: 'failure', error: action.payload.message }

    case actionTypes.DIFF__LEFT_FILE_SET:
      return { ...state, status: 'success', data: action.payload }
  }
  return state
}

export const diffRightFile = (
  state: ReduxAPIStruct<string> = defaultSet(),
  action: DiffFilesAction
): ReduxAPIStruct<string> => {
  switch (action.type) {
    case actionTypes.DIFF__FIREBASE_REQUEST:
      return { ...state, status: 'fetching' }

    case actionTypes.DIFF__FIREBASE_REQUEST_FAILURE:
      return { ...state, status: 'failure', error: action.payload.message }

    case actionTypes.DIFF__RIGHT_FILE_SET:
      return { ...state, status: 'success', data: action.payload }
  }
  return state
}

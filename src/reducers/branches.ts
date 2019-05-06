import { actionTypes } from '../constants'
import { ReduxAPIStruct, defaultSet } from './static-types'
import { BranchesAction, IsInvalidBranchAction } from '../actions/branches'
import { FirebaseSnapShot } from '../utils/firebase'

export const branches = (
  state: ReduxAPIStruct<FirebaseSnapShot[]> = defaultSet(),
  action: BranchesAction
): ReduxAPIStruct<FirebaseSnapShot[]> => {
  switch (action.type) {
    case actionTypes.BRANCH__FIREBASE_REQUEST:
      return { ...state, status: 'fetching' }

    case actionTypes.BRANCH__FIREBASE_REQUEST_FAILURE:
      return { ...state, status: 'failure', error: action.payload.message }

    case actionTypes.BRANCH__SET:
      return { ...state, status: 'success', data: action.payload.branches }

    case actionTypes.BRANCH__ADD:
      if ('newBranch' in action.payload) {
        if (state.data === null) return state
        return { ...state, status: 'success', data: state.data.concat(action.payload.newBranch) }
      }
  }
  return state
}

export const isValidBranch = (
  state: ReduxAPIStruct<boolean> = defaultSet(),
  action: IsInvalidBranchAction
): ReduxAPIStruct<boolean> => {
  switch (action.type) {
    case actionTypes.BRANCH_IS_VALID__FIREBASE_REQUEST:
      return { ...state, status: 'fetching' }

    case actionTypes.BRANCH_IS_VALID__FIREBASE_REQUEST_FAILURE:
      return { ...state, status: 'failure', error: action.payload.message }

    case actionTypes.BRANCH__CHECK_ID:
      return { ...state, status: 'success', data: action.payload.isValidBranchId }
  }
  return state
}

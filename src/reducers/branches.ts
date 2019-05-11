import { actionTypes } from '../common/constants/action-types'
import { ReduxAPIStruct, defaultSet } from '../common/static-types/api-struct'
import {
  BranchesAction,
  IsInvalidBranchAction,
  BranchData,
  BranchesStatusAction,
} from '../actions/branches'
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
      if (!('newBranch' in action.payload) || state.data === null) return state
      return { ...state, status: 'success', data: state.data.concat(action.payload.newBranch) }

    case actionTypes.BRANCH__MERGE_OR_CLOSE:
      if (!('branchId' in action.payload) || state.data === null) return state
      return {
        ...state,
        status: 'success',
        data: state.data.filter(branch => branch.id !== action.payload.branchId),
      }
  }
  return state
}

export const currentBranchData = (
  state: ReduxAPIStruct<BranchData> = defaultSet(),
  action: IsInvalidBranchAction
): ReduxAPIStruct<BranchData> => {
  switch (action.type) {
    case actionTypes.CURRENT_BRANCH_DATA__FIREBASE_REQUEST:
      return { ...state, status: 'fetching' }

    case actionTypes.CURRENT_BRANCH_DATA__FIREBASE_REQUEST_FAILURE:
      return { ...state, status: 'failure', error: action.payload.message }

    case actionTypes.CURRENT_BRANCH_DATA__CHECK:
      return { ...state, status: 'success', data: action.payload.branchData }
  }
  return state
}

export const selectedBranchId = (
  state: string | null = null,
  action: BranchesStatusAction
): string | null => {
  switch (action.type) {
    case actionTypes.SELECTED_BRANCH_ID__SET:
      return action.payload
  }
  return state
}

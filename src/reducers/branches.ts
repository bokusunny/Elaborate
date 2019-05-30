import { actionTypes } from '../common/constants/action-types'
import { ReduxAPIStruct, defaultSet } from '../common/static-types/api-struct'
import { BranchesAction, FetchCurrentBranchAction, BranchData } from '../actions/branches'
import { FirebaseSnapShot } from '../utils/firebase'

export const branches = (
  state: ReduxAPIStruct<FirebaseSnapShot[]> = defaultSet(),
  action: BranchesAction
): ReduxAPIStruct<FirebaseSnapShot[]> => {
  switch (action.type) {
    case actionTypes.BRANCH__FIREBASE_REQUEST:
      if (action.payload !== null) return state
      return { ...state, status: 'fetching' }

    case actionTypes.BRANCH__FIREBASE_REQUEST_FAILURE:
      if (action.payload === null || !('message' in action.payload)) return state
      return { ...state, status: 'failure', error: action.payload }

    case actionTypes.BRANCH__SET:
      if (action.payload === null || !('branches' in action.payload)) return state
      return { ...state, status: 'success', data: action.payload.branches }

    case actionTypes.BRANCH__ADD: {
      if (action.payload === null || !('newBranch' in action.payload)) return state
      const newBranchesArray = [...(state.data as FirebaseSnapShot[])]
      newBranchesArray.splice(1, 0, action.payload.newBranch)
      return {
        ...state,
        status: 'success',
        // ReduxAPIStructの構造上state.dataはnullにはなり得ない
        data: newBranchesArray,
      }
    }

    case actionTypes.BRANCH__MERGE_OR_CLOSE:
      if (action.payload === null || !('branchId' in action.payload)) return state
      return {
        ...state,
        status: 'success',
        // ReduxAPIStructの構造上state.dataはnullにはなり得ない
        data: (state.data as FirebaseSnapShot[]).filter(
          // TODO: filter内ではなぜかpayloadが{branchId: string}に制限されない🤔後で修正
          branch => branch.id !== (action.payload as { branchId: string }).branchId
        ),
      }
  }
  return state
}

export const currentBranch = (
  state: ReduxAPIStruct<BranchData> = defaultSet(),
  action: FetchCurrentBranchAction
): ReduxAPIStruct<BranchData> => {
  switch (action.type) {
    case actionTypes.CURRENT_BRANCH_DATA__FIREBASE_REQUEST:
      if (action.payload !== null) return state
      return { ...state, status: 'fetching' }

    case actionTypes.CURRENT_BRANCH_DATA__FIREBASE_REQUEST_FAILURE:
      if (action.payload === null || !('message' in action.payload)) return state
      return { ...state, status: 'failure', error: action.payload }

    case actionTypes.CURRENT_BRANCH_DATA__CHECK:
      if (action.payload === null || !('branchData' in action.payload)) return state
      return { ...state, status: 'success', data: action.payload.branchData }
  }
  return state
}

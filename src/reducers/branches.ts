import { actionTypes } from '../constants'
import { ReduxAPIStruct, defaultSet } from './static-types'
import { FirebaseSnapShot } from '../utils/firebase'
import { BranchesAction } from '../actions/branches'

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

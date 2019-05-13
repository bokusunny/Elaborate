import { actionTypes } from '../common/constants/action-types'
import { ReduxAPIStruct, defaultSet } from '../common/static-types/api-struct'
import { CommitsAction } from '../actions/commits'
import { FirebaseSnapShot } from '../utils/firebase'

export const commits = (
  state: ReduxAPIStruct<FirebaseSnapShot[]> = defaultSet(),
  action: CommitsAction
): ReduxAPIStruct<FirebaseSnapShot[]> => {
  switch (action.type) {
    case actionTypes.COMMIT__FIREBASE_REQUEST:
      if (action.payload !== null) return state
      return { ...state, status: 'fetching' }

    case actionTypes.COMMIT__FIREBASE_REQUEST_FAILURE:
      if (action.payload === null || !('message' in action.payload)) return state
      return { ...state, status: 'failure', error: action.payload }

    // case actionTypes.COMMIT__ADD:
    //   if ('newCommit' in action.payload) {
    //     if (state.data === null) return state
    //     return { ...state, status: 'success', data: state.data.concat(action.payload.newCommit) }
    //   }
  }
  return state
}

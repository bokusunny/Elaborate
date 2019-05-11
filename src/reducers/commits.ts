import { actionTypes } from '../common/constants/action-types'
import { ReduxAPIStruct, defaultSet } from '../common/static-types/api-struct'
import { CommitsAction, LatestCommitBodyAction } from '../actions/commits'
import { FirebaseSnapShot } from '../utils/firebase'

export const commits = (
  state: ReduxAPIStruct<FirebaseSnapShot[]> = defaultSet(),
  action: CommitsAction
): ReduxAPIStruct<FirebaseSnapShot[]> => {
  switch (action.type) {
    case actionTypes.COMMIT__FIREBASE_REQUEST:
      return { ...state, status: 'fetching' }

    case actionTypes.COMMIT__FIREBASE_REQUEST_FAILURE:
      return { ...state, status: 'failure', error: action.payload.message }

    case actionTypes.COMMIT__ADD:
      if ('newCommit' in action.payload) {
        if (state.data === null) return state
        return { ...state, status: 'success', data: state.data.concat(action.payload.newCommit) }
      }
  }
  return state
}

export const latestCommitBody = (
  state: ReduxAPIStruct<string> = defaultSet(),
  action: LatestCommitBodyAction
): ReduxAPIStruct<string> => {
  switch (action.type) {
    case actionTypes.LATEST_COMMIT_BODY__FIREBASE_REQUEST:
      return { ...state, status: 'fetching' }

    case actionTypes.LATEST_COMMIT_BODY__FIREBASE_REQUEST_FAILURE:
      return { ...state, status: 'failure', error: action.payload.message }

    case actionTypes.LATEST_COMMIT_BODY__SET:
      return { ...state, status: 'success', data: action.payload.bodyShouldDisplayOnEditor }
  }
  return state
}

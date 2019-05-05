import { db, FirebaseSnapShot } from '../utils/firebase'
import { ThunkDispatch } from 'redux-thunk'
// import { RawDraftContentBlock } from 'draft-js'
import { actionTypes } from '../constants'
import { BaseAction, FirebaseAPIRequest, FirebaseAPIFailure } from './static-types'
import { ReduxAPIStruct } from '../reducers/static-types'

// -------------------------------------------------------------------------
// Commits
// ------------------------------------------------------------------------
const commitFirebaseFailure = (message: string) => ({
  type: actionTypes.COMMIT__FIREBASE_REQUEST_FAILURE,
  payload: { statusCode: 500, message },
})

interface CreateCommitAction extends BaseAction {
  type: string
  payload: { newCommit: ReduxAPIStruct<FirebaseSnapShot> }
}

export type CommitsAction = FirebaseAPIRequest | FirebaseAPIFailure | CreateCommitAction

export const createCommit = (
  values: any,
  currentUserUid: string,
  directoryId: string,
  branchId: string
  // rawContentBlocks: RawDraftContentBlock[]
) => {
  return (dispatch: ThunkDispatch<{}, {}, CommitsAction>) => {
    dispatch({ type: actionTypes.COMMIT__FIREBASE_REQUEST })
    db.collection('users')
      .doc(currentUserUid)
      .collection('directories')
      .doc(directoryId)
      .collection('branches')
      .doc(branchId)
      .collection('commits')
      .add({
        name: values.commitName,
        body: '',
        cratedAt: Date.now(),
      })
      .then(newDocRef => {
        newDocRef.get().then(snapShot => {
          dispatch({
            type: actionTypes.COMMIT__ADD,
            payload: { newCommit: snapShot },
          })
        })
      })
      .catch(error => dispatch(commitFirebaseFailure(error.message)))
  }
}
